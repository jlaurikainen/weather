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

  return (
    <h1 className={`${styles.content} ${styles.temperature}`}>
      {formatDecimal(data.temperature)}
      {data.unit}
    </h1>
  );
}
