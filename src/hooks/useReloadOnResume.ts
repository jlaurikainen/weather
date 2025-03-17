import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useReloadOnResume() {
  const queryClient = useQueryClient();

  useEffect(() => {
    function onResume() {
      if (document.visibilityState === "visible") {
        queryClient.refetchQueries({ queryKey: ["current-weather"] });
        queryClient.refetchQueries({ queryKey: ["forecast"] });
      }
    }

    window.addEventListener("visibilitychange", onResume);

    return () => {
      window.removeEventListener("visibilitychange", onResume);
    };
  }, [queryClient]);
}
