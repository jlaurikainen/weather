import { JSX } from "react";

type Props = JSX.IntrinsicElements["input"];

export function Input(props: Props) {
  return (
    <input
      type="text"
      {...props}
      className={`border-outer-space w-full min-w-0 rounded-lg border-1 px-4 py-2 outline-0 hover:border-slate-400 focus:border-slate-400`}
    />
  );
}
