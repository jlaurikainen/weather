import { useGeoIdContext } from "@/contexts/geoid";
import { useForecasts } from "@/queries/forecasts";
import { useEffect } from "react";
import { Forecast } from "./forecast";

type Props = {
  location: GeolocationCoordinates;
};

export function Forecasts(props: Props) {
  const { data } = useForecasts(props.location);
  const { setGeoId } = useGeoIdContext();

  useEffect(() => {
    if (data) {
      setGeoId(data.geoid);
    }
  }, [data, setGeoId]);

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
