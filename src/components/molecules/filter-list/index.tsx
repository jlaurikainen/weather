import { Input } from "@/components/atoms/input";
import { List } from "@/components/atoms/list";

export function FilterList() {
  return (
    <div>
      <Input />

      <List>
        <List.Item>Item 1</List.Item>
        <List.Item>Item 2</List.Item>
      </List>
    </div>
  );
}
