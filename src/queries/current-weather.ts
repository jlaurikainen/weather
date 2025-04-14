import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./constants";

const FEATURE_URL = `${BASE_URL}fmi::observations::weather::timevaluepair`;

async function fetchData(place: string | null) {
  return fetch(getUrlWithParams(place))
    .then((res) => res.text())
    .then(traverseXML);
}

function getUrlWithParams(place: string | null) {
  const thirtyMinutesAgo = new Date();
  thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30, 0, 0);
  const startTime = thirtyMinutesAgo.toISOString();

  return `${FEATURE_URL}&place=${place}&starttime=${startTime}`;
}

function traverseXML(xml: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");

  const temperatures = Array.from(doc.getElementsByTagName("om:result"))[0];
  const temperature =
    Array.from(temperatures.getElementsByTagName("wml2:value")).at(-1)
      ?.textContent ?? "";

  return temperature;
}

export function useCurrentWeather(place: string | null) {
  return useQuery({
    queryKey: ["current-weather", place],
    queryFn: () => fetchData(place),
    placeholderData: keepPreviousData,
    refetchInterval: 1000 * 60 * 5,
    enabled: !!place,
  });
}
