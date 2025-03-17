import { Forecast } from "@/features/forecast";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useState } from "react";
import { GeoIdProvider } from "./contexts/geoid";
import { useReloadOnResume } from "./hooks/useReloadOnResume";

export function App() {
  const [geoId, setGeoId] = useState<number>();
  const { location } = useGeolocation();

  useReloadOnResume();

  if (!location) {
    return null;
  }

  return (
    <GeoIdProvider value={{ geoId, setGeoId }}>
      <Forecast location={location} />
    </GeoIdProvider>
  );
}
