import type { GeoCity } from "@/types/geo";

interface IpapiResponse {
  city: string;
  country_code: string;
  region: string;
  latitude: number;
  longitude: number;
  error?: boolean;
}

export const useGeolocation = () => {
  const detectCity = async (): Promise<GeoCity | null> => {
    try {
      const response = await fetch("https://ipapi.co/json");
      const data: IpapiResponse = await response.json();

      if (data.error) return null;

      return {
        name: data.city,
        country: data.country_code,
        state: data.region,
        lat: data.latitude,
        lon: data.longitude,
      };
    } catch {
      return null;
    }
  };

  return { detectCity };
};
