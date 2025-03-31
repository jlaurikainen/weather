import { JSX } from "react";
import { ListItem } from "./list-item";

type Props = JSX.IntrinsicElements["ul"];

export function List(props: Props) {
  return <ul {...props} />;
}

List.Item = ListItem;
