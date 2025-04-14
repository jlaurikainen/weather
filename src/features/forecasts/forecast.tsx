import { IconArrowDownward } from "@/components/atoms/icons";
import { formatDecimal } from "@/utils/number";
import { getWeatherStringAndSymbol } from "@/utils/weather";

type Props = {
  time: string | undefined;
  values: {
    temperature: number;
    weatherSymbol: number;
    windDirection: number;
    windSpeedMS: number;
  };
};

export function Forecast(props: Props) {
  const time = new Date(parseInt(props.time ?? "0") * 1000);
  const weatherStringAndSymbol = getWeatherStringAndSymbol(
    props.values.weatherSymbol,
  );
  const Icon = weatherStringAndSymbol?.[1];

  return (
    <div className="flex w-18 shrink-0 flex-col items-center gap-0.5 font-extralight">
      <p className="text-sm opacity-75">
        {time.toLocaleTimeString("fi", { hour: "numeric", minute: "2-digit" })}
      </p>
      {Icon ? <Icon fill="currentcolor" height={24} width={24} /> : null}
      <p>{formatDecimal(props.values.temperature)}°C</p>
      <p className="text-sm opacity-75">
        {formatDecimal(props.values.windSpeedMS)}m/s
      </p>
      <p style={{ rotate: `${props.values.windDirection}deg` }}>
        <IconArrowDownward fill="currentcolor" height={24} width={24} />
      </p>
    </div>
  );
}
