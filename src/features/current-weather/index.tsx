import { useCurrentWeather } from "@/queries/current-weather";
import { useForecasts } from "@/queries/forecasts";
import { formatDecimal } from "@/utils/number";
import { getWeatherStringAndSymbol } from "@/utils/weather";
import { useSearchParams } from "react-router-dom";

export function CurrentWeather() {
  const [params] = useSearchParams();
  const location = params.get("q");
  const { data } = useCurrentWeather(location);
  const { data: forecastData } = useForecasts(location);

  if (!data || !location || !forecastData) {
    return null;
  }

  const latestForecastValue = Array.from(forecastData.values())[0];
  const weatherStringAndSymbol = getWeatherStringAndSymbol(
    latestForecastValue.weatherSymbol,
  );
  const Icon = weatherStringAndSymbol?.[1];

  return (
    <div className="relative">
      <h1 className="mb-2 text-center text-7xl font-extralight">
        {`${formatDecimal(parseFloat(data))}°C`}
      </h1>
      <h2 className="text-center font-extralight opacity-75">
        {weatherStringAndSymbol?.[0]}
      </h2>
      {Icon ? (
        <div className="absolute inset-x-0 top-1/2 grid -translate-y-5/9 place-items-center opacity-5">
          <Icon fill="currentcolor" height={280} width={280} />
        </div>
      ) : null}
    </div>
  );
}
