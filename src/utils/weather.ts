import {
  Clear,
  Cloudy,
  Foggy,
  Misty,
  PartlyCloudy,
  Rainy,
  Sad,
  Sleet,
  Snowy,
  Thunder,
} from "@/components/atoms/icons";
import { ComponentType, SVGProps } from "react";

const weatherStringsAndSymbols: Record<
  number,
  [string, ComponentType<SVGProps<SVGSVGElement>>]
> = {
  1: ["Clear", Clear],
  2: ["Partly Cloudy", PartlyCloudy],
  3: ["Cloudy", Cloudy],
  21: ["Light Showers", Rainy],
  22: ["Showers", Rainy],
  23: ["Heavy Showers", Rainy],
  31: ["Light Rain", Rainy],
  32: ["Rain", Rainy],
  33: ["Heavy Rain", Rainy],
  41: ["Light Snow Showers", Snowy],
  42: ["Snow Showers", Snowy],
  43: ["Heavy Snow Showers", Snowy],
  51: ["Light Snow", Snowy],
  52: ["Snow", Snowy],
  53: ["Heavy Snow", Snowy],
  61: ["Thundershowers", Thunder],
  62: ["Heavy Thundershowers", Thunder],
  63: ["Thunder", Thunder],
  64: ["Heavy Thunder", Thunder],
  71: ["Light Sleet Showers", Sleet],
  72: ["Sleet Showers", Sleet],
  73: ["Heavy Sleet Showers", Sleet],
  81: ["Light Sleet", Sleet],
  82: ["Sleet", Sleet],
  83: ["Heavy Sleet", Sleet],
  91: ["Misty", Misty],
  92: ["Foggy", Foggy],
};

export function getWeatherStringAndSymbol(
  weatherSymbolCode: number,
): [string, ComponentType<SVGProps<SVGSVGElement>>] {
  if (!weatherStringsAndSymbols[weatherSymbolCode]) {
    return ["Unknown", Sad];
  }

  return weatherStringsAndSymbols[weatherSymbolCode];
}
