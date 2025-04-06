import { JSX } from "react";

type Props = JSX.IntrinsicElements["dialog"];

export function Menu(props: Props) {
  return (
    <dialog
      {...props}
      className="open:animate-in bg-gunmetal border-outer-space fixed mx-auto my-auto max-w-11/12 flex-col overflow-hidden rounded-xl border-1 text-white shadow-lg outline-0 backdrop:bg-neutral-950 backdrop:opacity-50"
    />
  );
}
