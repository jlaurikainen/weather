import { Forecasts } from "@/features/forecasts";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useState } from "react";
import { GeoIdProvider } from "./contexts/geoid";
import { CurrentWeather } from "./features/current-weather";
import { useReloadOnResume } from "./hooks/useReloadOnResume";

export function App() {
  const [geoId, setGeoId] = useState<number>();
  const [location, setLocation] = useState<string>();
  const { geolocation } = useGeolocation();

  useReloadOnResume();

  if (!geolocation) {
    return null;
  }

  return (
    <GeoIdProvider value={{ geoId, location, setGeoId, setLocation }}>
      <CurrentWeather />
      <Forecasts location={geolocation} />
    </GeoIdProvider>
  );
}
