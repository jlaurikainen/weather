import { createContext, useContext } from "react";

export type GeoIdContextProps = {
  geoId: number | undefined;
  location: string | undefined;
  setGeoId: (geoId: number) => void;
  setLocation: (location: string) => void;
};

const GeoIdContext = createContext<GeoIdContextProps | null>(null);

export const GeoIdProvider = GeoIdContext.Provider;

export function useGeoIdContext() {
  const context = useContext(GeoIdContext);

  if (!context) {
    throw new Error("GeoIdContext used outside its provider!");
  }

  return context;
}
