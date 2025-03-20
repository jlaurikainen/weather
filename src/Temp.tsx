import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { List } from "@/components/atoms/list";

export function Temp() {
  return (
    <div className="flex flex-col items-start gap-8">
      <Button>Button</Button>

      <Input defaultValue="Value" />

      <List>
        <List.Item>Item 1</List.Item>
        <List.Item>Item 2</List.Item>
      </List>
    </div>
  );
}
