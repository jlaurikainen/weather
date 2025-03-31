import cities from "@/assets/cities.json";
import { Button } from "@/components/atoms/button";
import { IconLocation } from "@/components/atoms/icons";
import { Input } from "@/components/atoms/input";
import { List } from "@/components/atoms/list";
import { Menu } from "@/components/atoms/menu";
import { useMenu } from "@/components/atoms/menu/useMenu";
import { filterStartsWith } from "@/utils/string";
import { ChangeEvent, PointerEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function LocationSelection() {
  const [filter, setFilter] = useState("");
  const [params, setParams] = useSearchParams();

  const { closeMenu, menuRef, openMenu } = useMenu();

  const filteredCities = cities.filter((city) =>
    filterStartsWith(city, filter),
  );

  function onChangeFilter(event: ChangeEvent<HTMLInputElement>) {
    setFilter(event.target.value);
  }

  function onSelectCity(event: PointerEvent<HTMLButtonElement>) {
    const selectedCity = event.currentTarget.innerText;

    localStorage.setItem("q", selectedCity);
    setParams({ q: selectedCity });
    setFilter("");
    closeMenu();
  }

  return (
    <div className="flex flex-col">
      <Button icon={IconLocation} onClick={openMenu}>
        {params.get("q") ?? "Select Location"}
      </Button>

      <Menu ref={menuRef} onCancel={closeMenu} onClose={closeMenu}>
        <div className="sticky top-0 bg-slate-800 p-2">
          <Input
            autoFocus
            onChange={onChangeFilter}
            placeholder="Search here..."
            value={filter}
          />
        </div>

        <List>
          {filteredCities.map((c) => (
            <List.Item key={c} onClick={onSelectCity}>
              {c}
            </List.Item>
          ))}
        </List>
      </Menu>
    </div>
  );
}
