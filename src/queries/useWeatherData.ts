import { Weather } from "@/types/weather";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

function getWeatherURL({ latitude, longitude }: GeolocationCoordinates) {
  return `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;
}

function transformData(data: Weather) {
  return {
    temperature: data.current.temperature_2m,
    unit: data.current_units.temperature_2m,
  };
}

async function fetchData(location: GeolocationCoordinates) {
  return fetch(getWeatherURL(location))
    .then((res): Promise<Weather> => res.json())
    .then(transformData);
}

export function useWeatherData(location: GeolocationCoordinates) {
  return useQuery<ReturnType<typeof transformData>>({
    queryKey: ["weather-data"],
    queryFn: () => fetchData(location),
    refetchInterval: 1000 * 60 * 5,
  });
}
