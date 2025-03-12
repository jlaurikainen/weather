import { CurrentTemperature } from "@/features/current-temperature";
import { useGeolocation } from "@/hooks/useGeolocation";

export function App() {
  const { location } = useGeolocation();

  if (!location) {
    return null;
  }

  return <CurrentTemperature location={location} />;
}
