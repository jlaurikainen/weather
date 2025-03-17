import { createContext, useContext } from "react";

export type LocationContextProps = {
  geoId: number | undefined;
  location: string | undefined;
  setGeoId: (geoId: number) => void;
  setLocation: (location: string) => void;
};

const LocationContext = createContext<LocationContextProps | null>(null);

export const LocationProvider = LocationContext.Provider;

export function useLocationContext() {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error("LocationContext used outside its provider!");
  }

  return context;
}
