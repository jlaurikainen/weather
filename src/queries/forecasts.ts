import { addDays, getClosestFullHour } from "@/utils/time";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./constants";

export type WeatherData = ReturnType<typeof traverseXML>;

const FEATURE_URL = `${BASE_URL}fmi::forecast::edited::weather::scandinavia::point::timevaluepair`;

async function fetchData(geolocation: GeolocationCoordinates | undefined) {
  return fetch(getUrlWithParams(geolocation))
    .then((res) => res.text())
    .then(traverseXML);
}

function getUrlWithParams(geolocation: GeolocationCoordinates | undefined) {
  const startTime = getClosestFullHour();
  const startTimeString = startTime.toISOString();
  const endTime = addDays(startTime, 1);
  const endTimeString = endTime.toISOString();

  return `${FEATURE_URL}&latlon=${geolocation?.latitude},${geolocation?.longitude}&starttime=${startTimeString}&endtime=${endTimeString}`;
}

function traverseXML(xml: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");

  const locationCollection = doc.getElementsByTagName(
    "target:LocationCollection",
  )?.[0];
  const geoId = parseInt(
    locationCollection?.getElementsByTagName("gml:identifier")?.[0]
      ?.textContent ?? "",
  );
  const location =
    locationCollection.getElementsByTagName("gml:name")?.[0].textContent ?? "";
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

  return { geoId, location, members };
}

export function useForecasts(geolocation: GeolocationCoordinates | undefined) {
  return useQuery<WeatherData>({
    queryKey: ["forecast", geolocation],
    queryFn: () => fetchData(geolocation),
    placeholderData: keepPreviousData,
    refetchInterval: 1000 * 60 * 5,
    enabled: !!geolocation,
  });
}
