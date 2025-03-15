import { WeatherData } from "@/queries/useWeatherData";
import { Forecast } from "./forecast";

type Props = {
  forecasts: WeatherData["members"][0]["values"];
};

export function Forecasts(props: Props) {
  return (
    <div className="flex overflow-x-auto opacity-75">
      {props.forecasts.map((forecast) => (
        <Forecast key={forecast.time.toString()} forecast={forecast} />
      ))}
    </div>
  );
}
