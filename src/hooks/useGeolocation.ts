import { useEffect, useState } from "react";

function getStorageValue() {
  const storageValue = localStorage.getItem("location");

  if (!storageValue) {
    return undefined;
  }

  return JSON.parse(storageValue) as GeolocationCoordinates;
}

function setStorageValue(location: GeolocationCoordinates) {
  localStorage.setItem("location", JSON.stringify(location));
}

export function useGeolocation() {
  const [geolocation, setGeolocation] = useState<
    GeolocationCoordinates | undefined
  >(getStorageValue);
  const [error, setError] = useState<GeolocationPositionError>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeolocation(position.coords);
      },
      (error) => {
        setError(error);
      },
    );
  }, []);

  useEffect(() => {
    if (geolocation) {
      setStorageValue(geolocation);
    }
  }, [geolocation]);

  return { geolocation, error };
}
