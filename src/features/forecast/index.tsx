import { useForecasts } from "@/queries/useForecasts";
import { CurrentTemperature } from "./current-temperature";
import { Forecasts } from "./forecasts";

type Props = {
  location: GeolocationCoordinates;
};

export function Forecast(props: Props) {
  const { data } = useForecasts(props.location);

  if (!data) {
    return null;
  }

  const temperatures = data.members.filter(
    (value) => value.type === "Temperature",
  )[0].values;
  const [currentValue, ...forecasts] = temperatures;

  return (
    <div className="flex flex-col gap-8 self-center overflow-hidden">
      <CurrentTemperature
        location={data.location}
        temperature={currentValue.value}
      />
      <Forecasts forecasts={forecasts} />
    </div>
  );
}
