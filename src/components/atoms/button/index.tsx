import { JSX } from "react";

type Props = JSX.IntrinsicElements["button"];

export function Button(props: Props) {
  return <button type="button" {...props} />;
}
