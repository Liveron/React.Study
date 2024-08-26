import { useState } from "react";

type Coords = {
  lat: number;
  lng: number;
};

export function useGeolocation(
  defaultPosition: Coords = { lat: 0, lng: 0 },
  onGetPosition: () => void = () => {}
): [boolean, Coords, string, () => void] {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState("");

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        onGetPosition();
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return [isLoading, position, error, getPosition];
}
