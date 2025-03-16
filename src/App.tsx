import { Forecast } from "@/features/forecast";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useReloadOnResume } from "./hooks/useReloadOnResume";

export function App() {
  const { location } = useGeolocation();

  useReloadOnResume();

  if (!location) {
    return null;
  }

  return <Forecast location={location} />;
}
