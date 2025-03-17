import { getClosestFlooredMinutes } from "@/utils/time";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./constants";

const FEATURE_URL = `${BASE_URL}fmi::observations::weather::simple`;

function getUrlWithParams(geoId: number | undefined) {
  const startTime = getClosestFlooredMinutes();
  const startTimeString = startTime.toISOString();

  return `${FEATURE_URL}&geoid=${geoId}&starttime=${startTimeString}`;
}

async function fetchData(geoId: number | undefined) {
  return fetch(getUrlWithParams(geoId))
    .then((res) => res.text())
    .then(traverseXML);
}

function traverseXML(xml: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");

  const temperature = parseFloat(
    doc.getElementsByTagName("BsWfs:ParameterValue")[0].textContent ?? "",
  );
  const time = new Date(
    doc.getElementsByTagName("BsWfs:Time")[0].textContent ?? "",
  );

  return { temperature, time };
}

export function useCurrentWeather(geoId: number | undefined) {
  return useQuery({
    queryKey: ["current-weather", geoId],
    queryFn: () => fetchData(geoId),
    refetchInterval: 1000 * 60 * 5,
    enabled: !!geoId,
  });
}
