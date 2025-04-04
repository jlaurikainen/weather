import { JSX } from "react";

type Props = JSX.IntrinsicElements["dialog"];

export function Menu(props: Props) {
  return (
    <dialog
      {...props}
      className="open:animate-in fixed mx-auto my-auto max-h-80 max-w-11/12 flex-col overflow-auto rounded-xl border-1 border-slate-600 bg-slate-800 text-white shadow-lg outline-0 backdrop:bg-neutral-950 backdrop:opacity-50 backdrop:blur-sm"
    />
  );
}
