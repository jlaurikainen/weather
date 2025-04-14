import { useForecasts } from "@/queries/forecasts";
import { useSearchParams } from "react-router-dom";
import { Forecast } from "./forecast";

export function Forecasts() {
  const [params] = useSearchParams();
  const { data } = useForecasts(params.get("q"));

  return (
    <div className="flex max-w-full self-center overflow-x-auto p-2 opacity-75">
      {data?.map((values) => (
        <Forecast key={values.time?.toString()} {...values} />
      ))}
    </div>
  );
}
