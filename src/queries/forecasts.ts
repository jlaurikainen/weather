import { addDays, getClosestFullHour } from "@/utils/time";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./constants";

export type WeatherData = ReturnType<typeof traverseXML>;

const FEATURE_URL = `${BASE_URL}fmi::forecast::edited::weather::scandinavia::point::timevaluepair`;

function getUrlWithParams({ latitude, longitude }: GeolocationCoordinates) {
  const startTime = getClosestFullHour();
  const startTimeString = startTime.toISOString();
  const endTime = addDays(startTime, 1);
  const endTimeString = endTime.toISOString();

  return `${FEATURE_URL}&latlon=${latitude},${longitude}&starttime=${startTimeString}&endtime=${endTimeString}`;
}

function traverseXML(xml: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");
  const geoid =
    doc
      .getElementsByTagName("target:LocationCollection")?.[0]
      ?.getElementsByTagName("gml:identifier")?.[0]?.textContent ?? "";

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

  return { geoid: parseInt(geoid), members };
}

async function fetchData(location: GeolocationCoordinates) {
  return fetch(getUrlWithParams(location))
    .then((res) => res.text())
    .then(traverseXML);
}

export function useForecasts(location: GeolocationCoordinates) {
  return useQuery<WeatherData>({
    queryKey: ["forecast"],
    queryFn: () => fetchData(location),
    refetchInterval: 1000 * 60 * 5,
  });
}
