import { JSX } from "react";

type Props = JSX.IntrinsicElements["li"];

export function ListItem(props: Props) {
  return <li {...props} />;
}
