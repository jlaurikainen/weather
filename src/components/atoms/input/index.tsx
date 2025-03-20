import { JSX } from "react";

type Props = JSX.IntrinsicElements["input"];

export function Input(props: Props) {
  return (
    <input
      type="text"
      {...props}
      className={`min-w-0 rounded-lg border-1 border-slate-600 px-4 py-2 outline-0 hover:border-slate-400 focus:border-slate-400`}
    />
  );
}
