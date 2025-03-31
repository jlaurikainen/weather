import { useEffect, useRef } from "react";

export function useMenu() {
  const menuRef = useRef<HTMLDialogElement>(null);

  function openMenu() {
    menuRef.current?.showModal();
    menuRef.current?.scrollTo({ top: 0 });
  }

  function closeMenu() {
    menuRef.current?.close();
  }

  useEffect(() => {
    const menu = menuRef.current;

    if (!menu) return;

    function onClickOutside(event: MouseEvent) {
      if ((event.target as HTMLElement).tagName !== "DIALOG") {
        return;
      }

      closeMenu();
    }

    menu.addEventListener("click", onClickOutside);

    return () => {
      menu.removeEventListener("click", onClickOutside);
    };
  }, []);

  return { closeMenu, menuRef, openMenu };
}
