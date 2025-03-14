import { useWeatherData } from "@/queries/useWeatherData";
import { formatDecimal } from "@/utils/number";

type Props = {
  location: GeolocationCoordinates;
};

export function CurrentTemperature(props: Props) {
  const { data } = useWeatherData(props.location);

  const temperature = data?.find((value) => value.type === "Temperature")
    ?.values[0].value;

  return (
    <h1 className="self-center justify-self-center text-7xl">
      {temperature ? `${formatDecimal(temperature)}°C` : null}
    </h1>
  );
}
