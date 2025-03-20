import { Button } from "@/components/atoms/button";
import { Menu } from "@/components/atoms/menu";
import { FilterList } from "@/components/molecules/filter-list";
import { Fragment } from "react";

export function Combobox() {
  return (
    <Fragment>
      <Button />

      <Menu>
        <FilterList />
      </Menu>
    </Fragment>
  );
}
