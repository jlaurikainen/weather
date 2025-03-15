import { formatDecimal } from "@/utils/number";

type Props = {
  location: string | undefined;
  temperature: number;
};

export function CurrentTemperature(props: Props) {
  return (
    <div>
      <h2 className="mb-3 text-center text-2xl">{props.location}</h2>
      <h1 className="text-center text-7xl">
        {props.temperature ? `${formatDecimal(props.temperature)}°C` : null}
      </h1>
    </div>
  );
}
