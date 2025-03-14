import { getClosestFullHour } from "@/utils/time";
import { useQuery } from "@tanstack/react-query";

const BASE_URL =
  "https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::edited::weather::scandinavia::point::timevaluepair";

function getWeatherURL({ latitude, longitude }: GeolocationCoordinates) {
  const timeString = getClosestFullHour().toISOString();

  return `${BASE_URL}&latlon=${latitude},${longitude}&starttime=${timeString}&endtime=${timeString}`;
}

function traverseXML(xml: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");

  return Array.from(doc.getElementsByTagName("wfs:member")).map((member) => {
    const series = member.getElementsByTagName("wml2:MeasurementTimeseries")[0];
    const points = Array.from(series.getElementsByTagName("wml2:point"));
    const pointValues = [];

    for (const point of points) {
      const time = point.getElementsByTagName("wml2:time")[0].textContent;
      const value = parseFloat(
        `${point.getElementsByTagName("wml2:value")[0].textContent}`,
      );

      pointValues.push({ time, value });
    }

    return {
      type: series.getAttribute("gml:id")?.replace("mts-1-1-", ""),
      values: pointValues,
    };
  });
}

async function fetchData(location: GeolocationCoordinates) {
  return fetch(getWeatherURL(location))
    .then((res) => res.text())
    .then(traverseXML);
}

export function useWeatherData(location: GeolocationCoordinates) {
  return useQuery<ReturnType<typeof traverseXML>>({
    queryKey: ["weather-data"],
    queryFn: () => fetchData(location),
    refetchInterval: 1000 * 60 * 5,
  });
}
