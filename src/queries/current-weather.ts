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
  const latestMeasurement = Array.from(
    temperatures.getElementsByTagName("wml2:MeasurementTVP"),
  ).at(-1);
  const temperature = parseFloat(
    latestMeasurement?.getElementsByTagName("wml2:value")[0].textContent ?? "",
  );
  const time = new Date(
    latestMeasurement?.getElementsByTagName("wml2:time")[0].textContent ?? "",
  );

  return { temperature, time };
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
