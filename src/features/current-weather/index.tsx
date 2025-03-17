import { formatDecimal } from "@/utils/number";

type Props = {
  location: string | undefined;
  temperature: number;
};

export function CurrentWeather(props: Props) {
  return (
    <div>
      <h2 className="text-center text-2xl font-extralight">{props.location}</h2>
      <h1 className="text-center text-7xl font-extralight">
        {props.temperature ? `${formatDecimal(props.temperature)}°C` : null}
      </h1>
    </div>
  );
}
