import { useWeatherData } from "@/queries/useWeatherData";
import { formatDecimal } from "@/utils/number";
import styles from "./current-temperature.module.css";

type Props = {
  location: GeolocationCoordinates;
};

export function CurrentTemperature(props: Props) {
  const { data, isError, isLoading } = useWeatherData(props.location);

  if (isLoading) {
    return <p className={`${styles.content} ${styles.animate}`}>...</p>;
  }

  if (isError) {
    return <p className={`${styles.content} ${styles.animate}`}>˙◠˙</p>;
  }

  if (!data) {
    return <p className={`${styles.content} ${styles.temperature}`}>No Data</p>;
  }

  const temperature = data.find((value) => value.type === "Temperature")
    ?.values[0].value;

  return (
    <h1 className={`${styles.content} ${styles.temperature}`}>
      {temperature ? `${formatDecimal(temperature)}°C` : null}
    </h1>
  );
}
