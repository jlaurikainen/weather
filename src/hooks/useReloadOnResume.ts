import { queryClient } from "@/main";
import { useEffect } from "react";

export function useReloadOnResume() {
  function onResume() {
    if (document.visibilityState === "visible") {
      queryClient.refetchQueries({ queryKey: ["weather-data"] });
    }
  }

  useEffect(() => {
    window.addEventListener("visibilitychange", onResume);

    return () => {
      window.removeEventListener("visibilitychange", onResume);
    };
  }, []);
}
