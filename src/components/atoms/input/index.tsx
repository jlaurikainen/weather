import { JSX } from "react";

type Props = JSX.IntrinsicElements["input"];

export function Input(props: Props) {
  return <input type="text" {...props} />;
}
