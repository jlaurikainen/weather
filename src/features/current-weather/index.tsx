import { useLocationContext } from "@/contexts/geoid";
import { useCurrentWeather } from "@/queries/current-weather";
import { formatDecimal } from "@/utils/number";

export function CurrentWeather() {
  const { geoId, location } = useLocationContext();
  const { data } = useCurrentWeather(geoId);

  return (
    <div>
      <h2 className="text-center text-2xl font-extralight">
        {location},{" "}
        {data?.time.toLocaleTimeString("fi", {
          hour: "numeric",
          minute: "2-digit",
        })}
      </h2>
      <h1 className="text-center text-7xl font-extralight">
        {data?.temperature ? `${formatDecimal(data.temperature)}°C` : null}
      </h1>
    </div>
  );
}
