import { Forecast } from "@/features/forecast";
import { useGeolocation } from "@/hooks/useGeolocation";

export function App() {
  const { location } = useGeolocation();

  if (!location) {
    return null;
  }

  return <Forecast location={location} />;
}
