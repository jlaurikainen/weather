import { WeatherData } from "@/queries/useWeatherData";
import { formatDecimal } from "@/utils/number";

type Props = {
  forecast: WeatherData["members"][0]["values"][0];
};

export function Forecast(props: Props) {
  return (
    <div className="flex w-18 shrink-0 flex-col items-center gap-0.5 font-extralight">
      <h1>{formatDecimal(props.forecast.value)}°C</h1>
      <h2 className="flex flex-col items-center">
        {props.forecast.time.toLocaleTimeString("fi", {
          hour: "numeric",
          minute: "2-digit",
        })}
      </h2>
    </div>
  );
}
