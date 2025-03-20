import { JSX } from "react";

type Props = JSX.IntrinsicElements["dialog"];

export function Menu(props: Props) {
  return <dialog {...props} className={``} />;
}
