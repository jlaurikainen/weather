import { useForecasts } from "@/queries/forecasts";
import { useSearchParams } from "react-router-dom";
import { Forecast } from "./forecast";

export function Forecasts() {
  const [params] = useSearchParams();
  const { data } = useForecasts(params.get("q"));

  return (
    <div className="flex max-w-full self-center overflow-x-auto p-2 opacity-75">
      {Array.from(data?.entries() ?? []).map(([time, values]) => (
        <Forecast key={time} time={time} values={values} />
      ))}
    </div>
  );
}
