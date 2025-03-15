import { WeatherData } from "@/queries/useWeatherData";
import { formatDecimal } from "@/utils/number";

type Props = {
  forecasts: WeatherData["members"][0]["values"];
};

export function Forecasts(props: Props) {
  return (
    <div className="flex overflow-x-auto">
      {props.forecasts.map((forecast) => (
        <div key={forecast.time.toString()}>
          <h1>{formatDecimal(forecast.value)}</h1>
          <h2>
            {forecast.time.toLocaleTimeString("fi", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </h2>
        </div>
      ))}
    </div>
  );
}
