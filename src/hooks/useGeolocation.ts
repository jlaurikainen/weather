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
  const [location, setLocation] = useState<GeolocationCoordinates | undefined>(
    getStorageValue,
  );
  const [error, setError] = useState<GeolocationPositionError>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
      },
      (error) => {
        setError(error);
      },
    );
  }, []);

  useEffect(() => {
    if (location) {
      setStorageValue(location);
    }
  }, [location]);

  return { location, error };
}
