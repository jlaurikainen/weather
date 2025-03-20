import { JSX } from "react";

type Props = JSX.IntrinsicElements["button"];

export function Button(props: Props) {
  return (
    <button
      type="button"
      {...props}
      className={`cursor-pointer rounded-lg border-1 border-slate-600 px-4 py-2 outline-0 hover:border-slate-400 focus-visible:border-slate-400 active:border-slate-500`}
    />
  );
}
