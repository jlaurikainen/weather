import { useEffect, useState } from "react";

export function useGeolocation() {
  const [location, setLocation] = useState<GeolocationCoordinates>();
  const [error, setError] = useState<GeolocationPositionError>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
      },
      (error) => {
        setError(error);
      }
    );
  }, []);

  return { location, error };
}
