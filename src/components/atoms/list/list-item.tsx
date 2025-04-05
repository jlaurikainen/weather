import { JSX } from "react";

type Props = JSX.IntrinsicElements["button"];

export function ListItem(props: Props) {
  return (
    <li>
      <button
        {...props}
        className={`w-full cursor-pointer px-4 py-2 text-left outline-0 hover:bg-slate-700 focus:bg-slate-600 active:bg-slate-600`}
      />
    </li>
  );
}
