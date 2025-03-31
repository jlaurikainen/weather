import { CurrentWeather } from "@/features/current-weather";
import { Forecasts } from "@/features/forecasts";
import { useReloadOnResume } from "@/hooks/useReloadOnResume";
import { Fragment } from "react";
import { LocationSelection } from "./features/location-selection";
import { useInitializeParams } from "./hooks/useInitializeParams";

export function App() {
  useInitializeParams();
  useReloadOnResume();

  return (
    <Fragment>
      <div className="flex flex-1 flex-col justify-center gap-8">
        <CurrentWeather />
        <Forecasts />
      </div>

      <LocationSelection />
    </Fragment>
  );
}
