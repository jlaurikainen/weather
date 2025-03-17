import { WeatherData } from "@/queries/useForecasts";
import { Forecast } from "./forecast";

type Props = {
  forecasts: WeatherData["members"][0]["values"];
};

export function Forecasts(props: Props) {
  return (
    <div className="flex max-w-full self-center overflow-x-auto p-2 opacity-75">
      {props.forecasts.map((forecast) => (
        <Forecast key={forecast.time.toString()} forecast={forecast} />
      ))}
    </div>
  );
}
