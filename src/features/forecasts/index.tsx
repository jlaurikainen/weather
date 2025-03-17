import { useLocationContext } from "@/contexts/geoid";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useForecasts } from "@/queries/forecasts";
import { useEffect } from "react";
import { Forecast } from "./forecast";

export function Forecasts() {
  const { geolocation } = useGeolocation();
  const { data } = useForecasts(geolocation);
  const { setGeoId, setLocation } = useLocationContext();

  useEffect(() => {
    if (data) {
      setGeoId(data.geoId);
      setLocation(data.location);
    }
  }, [data, setGeoId, setLocation]);

  const forecasts =
    data?.members.filter((value) => value.type === "Temperature")[0].values ??
    [];

  return (
    <div className="flex max-w-full self-center overflow-x-auto p-2 opacity-75">
      {forecasts.map((forecast) => (
        <Forecast key={forecast.time.toString()} forecast={forecast} />
      ))}
    </div>
  );
}
