import { addDays, getNextFullHour } from "@/utils/time";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./constants";

export type WeatherData = ReturnType<typeof traverseXML>;

const FEATURE_URL = `${BASE_URL}fmi::forecast::edited::weather::scandinavia::point::multipointcoverage`;

async function fetchData(place: string | null) {
  return fetch(getUrlWithParams(place))
    .then((res) => res.text())
    .then(traverseXML);
}

function getUrlWithParams(place: string | null) {
  const startTime = getNextFullHour();
  const startTimeString = startTime.toISOString();
  const endTime = addDays(startTime, 1);
  const endTimeString = endTime.toISOString();

  return `${FEATURE_URL}&place=${place}&starttime=${startTimeString}&endtime=${endTimeString}`;
}

function traverseXML(xml: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");

  const positionString = doc
    .getElementsByTagName("gmlcov:positions")[0]
    .textContent?.trim();
  const positionLines = positionString?.split("\n").map((line) => line.trim());
  const positions = positionLines?.map((line) => line.split(" "));
  const timeStamps = positions?.map((arr) => arr.at(-1));

  const fieldTypes = Array.from(doc.getElementsByTagName("swe:field"));
  const fieldNames = fieldTypes.map((field) => field.getAttribute("name"));

  const forecastValueString = doc
    .getElementsByTagName("gml:doubleOrNilReasonTupleList")[0]
    .textContent?.trim();
  const forecastLines = forecastValueString
    ?.split("\n")
    .map((line) => line.trim());
  const forecastValues = forecastLines?.map((line) => line.split(" "));

  const valueIndexes = [
    fieldNames.indexOf("Temperature"),
    fieldNames.indexOf("WindDirection"),
    fieldNames.indexOf("WindSpeedMS"),
    fieldNames.indexOf("WeatherSymbol3"),
  ];

  const forecasts = new Map<
    string | undefined,
    {
      temperature: number;
      windDirection: number;
      windSpeedMS: number;
      weatherSymbol: number;
    }
  >();

  timeStamps?.forEach((time, i) => {
    forecasts.set(time, {
      temperature: parseFloat(`${forecastValues?.[i]?.[valueIndexes[0]]}`),
      windDirection: parseFloat(`${forecastValues?.[i]?.[valueIndexes[1]]}`),
      windSpeedMS: parseFloat(`${forecastValues?.[i]?.[valueIndexes[2]]}`),
      weatherSymbol: parseInt(`${forecastValues?.[i]?.[valueIndexes[3]]}`),
    });
  });

  return forecasts;
}

export function useForecasts(place: string | null) {
  return useQuery<WeatherData>({
    queryKey: ["forecast", place],
    queryFn: () => fetchData(place),
    placeholderData: keepPreviousData,
    refetchInterval: 1000 * 60 * 5,
    enabled: !!place,
  });
}
