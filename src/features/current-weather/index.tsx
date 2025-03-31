import { useCurrentWeather } from "@/queries/current-weather";
import { formatDecimal } from "@/utils/number";
import { useSearchParams } from "react-router-dom";

export function CurrentWeather() {
  const [params] = useSearchParams();
  const location = params.get("q");
  const { data } = useCurrentWeather(location);

  if (!data || !location) {
    return null;
  }

  return (
    <div>
      <h1 className="mb-2 text-center text-7xl font-extralight">
        {`${formatDecimal(data.temperature)}°C`}
      </h1>
      <h2 className="text-center text-2xl font-extralight">
        {data.time.toLocaleTimeString("fi", {
          hour: "numeric",
          minute: "2-digit",
        })}
      </h2>
    </div>
  );
}
