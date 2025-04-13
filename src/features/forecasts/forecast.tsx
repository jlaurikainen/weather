import { IconArrowDownward } from "@/components/atoms/icons";
import { formatDecimal } from "@/utils/number";

type Props = {
  time: string | undefined;
  values: {
    temperature: number;
    windDirection: number;
    windSpeedMS: number;
  };
};

export function Forecast(props: Props) {
  const time = new Date(parseInt(props.time ?? "0") * 1000);

  return (
    <div className="flex w-18 shrink-0 flex-col items-center gap-0.5 font-extralight">
      <p>
        {time.toLocaleTimeString("fi", { hour: "numeric", minute: "2-digit" })}
      </p>
      <p>{formatDecimal(props.values.temperature)}°C</p>
      <p>{formatDecimal(props.values.windSpeedMS)}m/s</p>
      <p style={{ rotate: `${props.values.windDirection}deg` }}>
        <IconArrowDownward fill="currentcolor" height={32} width={32} />
      </p>
    </div>
  );
}
