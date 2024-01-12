// useGeolocation.ts
import { ref, Ref } from "vue";

interface Coordinates {
  latitude: number | null;
  longitude: number | null;
}

export async function useGeolocation(): Promise<{
  coords: Coordinates;
  error: Error | null;
}> {
  const coords: Ref<Coordinates> = ref({ latitude: null, longitude: null });
  const error: Ref<Error | null> = ref(null);

  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          coords.value = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          resolve({ coords: coords.value, error: null });
        },
        (err) => {
          error.value = err;
          resolve({ coords: coords.value, error: error.value });
        }
      );
    } else {
      error.value = new Error("Geolocation is not supported by this browser.");
      resolve({ coords: coords.value, error: error.value });
    }
  });
}
