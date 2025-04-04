import { Button } from "@/components/atoms/button";
import { IconInfo } from "@/components/atoms/icons";
import { Menu } from "@/components/atoms/menu";
import { useMenu } from "@/components/atoms/menu/useMenu";

export function LicenseInfo() {
  const { menuRef, closeMenu, openMenu } = useMenu();

  return (
    <div className="ml-auto">
      <Button icon={IconInfo} onClick={openMenu} />

      <Menu ref={menuRef} onClose={closeMenu} onCancel={closeMenu}>
        <div className="max-w-80 p-4">
          <h2 className="mb-4 text-lg">License Info</h2>

          <p className="mb-4">
            Weather data from Finnish Meteorological Institute open data APIs.
          </p>

          <p>
            APIs used: forecast point data for scandinavia and momentary
            observations.
          </p>
        </div>
      </Menu>
    </div>
  );
}
