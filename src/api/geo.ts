import type { GeoCity } from "@/types/geo";
import { geoClient } from "./client";

export const searchCities = async (
  query: string,
  limit = 5,
): Promise<GeoCity[]> => {
  const { data } = await geoClient.get<GeoCity[]>("/direct", {
    params: { q: query, limit },
  });
  return data;
};
