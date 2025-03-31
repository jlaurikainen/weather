import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useInitializeParams() {
  const [, setParams] = useSearchParams();

  useEffect(() => {
    const storedLocation = localStorage.getItem("q");

    if (!storedLocation) return;

    setParams({ q: storedLocation });
  }, [setParams]);
}
