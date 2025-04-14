import { IconArrowDownward } from "@/components/atoms/icons";
import { formatDecimal } from "@/utils/number";
import { getWeatherStringAndSymbol } from "@/utils/weather";

type Props = {
  temperature: number;
  time: number;
  weatherSymbol: number;
  windDirection: number;
  windSpeedMS: number;
};

export function Forecast(props: Props) {
  const time = new Date(props.time * 1000);
  const [, Icon] = getWeatherStringAndSymbol(props.weatherSymbol);

  return (
    <div className="flex w-18 shrink-0 flex-col items-center gap-0.5 font-extralight">
      <p className="text-sm opacity-75">
        {time.toLocaleTimeString("fi", { hour: "numeric", minute: "2-digit" })}
      </p>

      <Icon fill="currentcolor" height={24} width={24} />

      <p>{formatDecimal(props.temperature)}°C</p>

      <p className="text-sm opacity-75">
        {formatDecimal(props.windSpeedMS)}m/s
      </p>

      <p style={{ rotate: `${props.windDirection}deg` }}>
        <IconArrowDownward fill="currentcolor" height={24} width={24} />
      </p>
    </div>
  );
}
