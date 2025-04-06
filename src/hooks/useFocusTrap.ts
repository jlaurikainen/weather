import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR = `
  a[href]:not([disabled]),
  button:not([disabled]),
  details:not([disabled]),
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  [tabindex]:not([tabindex="-1"]):not([disabled])
`;

export function useFocusTrap<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    function onKeyDown(event: KeyboardEvent) {
      if (!el) return;
      if (event.key !== "Tab") return;

      const focusableElements = Array.from<HTMLElement>(
        el.querySelectorAll(FOCUSABLE_SELECTOR),
      );
      const firstElement = focusableElements.at(0);
      const lastElement = focusableElements.at(-1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
        return;
      }
    }

    el.addEventListener("keydown", onKeyDown);

    return () => {
      el.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return ref;
}
