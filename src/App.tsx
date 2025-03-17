import { Forecasts } from "@/features/forecasts";
import { useState } from "react";
import { LocationProvider } from "./contexts/geoid";
import { CurrentWeather } from "./features/current-weather";
import { useReloadOnResume } from "./hooks/useReloadOnResume";

export function App() {
  const [geoId, setGeoId] = useState<number>();
  const [location, setLocation] = useState<string>();

  useReloadOnResume();

  return (
    <LocationProvider value={{ geoId, location, setGeoId, setLocation }}>
      <CurrentWeather />
      <Forecasts />
    </LocationProvider>
  );
}
