import { useForecasts } from "@/queries/forecasts";
import { useSearchParams } from "react-router-dom";
import { Forecast } from "./forecast";

export function Forecasts() {
  const [params] = useSearchParams();
  const { data } = useForecasts(params.get("q"));

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
