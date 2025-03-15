import { addDays, getClosestFullHour } from "@/utils/time";
import { useQuery } from "@tanstack/react-query";

export type WeatherData = ReturnType<typeof traverseXML>;

const BASE_URL =
  "https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::edited::weather::scandinavia::point::timevaluepair";

function getWeatherURL({ latitude, longitude }: GeolocationCoordinates) {
  const startTime = getClosestFullHour();
  const startTimeString = startTime.toISOString();
  const endTime = addDays(startTime, 1);
  const endTimeString = endTime.toISOString();

  return `${BASE_URL}&latlon=${latitude},${longitude}&starttime=${startTimeString}&endtime=${endTimeString}`;
}

function traverseXML(xml: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");
  const location =
    doc.getElementsByTagName("target:region")[0].textContent ?? "";

  const members = Array.from(doc.getElementsByTagName("wfs:member")).map(
    (member) => {
      const series = member.getElementsByTagName(
        "wml2:MeasurementTimeseries",
      )[0];
      const points = Array.from(series.getElementsByTagName("wml2:point"));
      const pointValues = [];

      for (const point of points) {
        const time = new Date(
          point.getElementsByTagName("wml2:time")[0].textContent ?? "",
        );
        const value = parseFloat(
          `${point.getElementsByTagName("wml2:value")[0].textContent}`,
        );

        pointValues.push({ time, value });
      }

      return {
        type: series.getAttribute("gml:id")?.replace("mts-1-1-", ""),
        values: pointValues,
      };
    },
  );

  return { location, members };
}

async function fetchData(location: GeolocationCoordinates) {
  return fetch(getWeatherURL(location))
    .then((res) => res.text())
    .then(traverseXML);
}

export function useWeatherData(location: GeolocationCoordinates) {
  return useQuery<WeatherData>({
    queryKey: ["weather-data"],
    queryFn: () => fetchData(location),
    refetchInterval: 1000 * 60 * 5,
  });
}
