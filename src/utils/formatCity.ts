import type { GeoCity } from "@/types/geo";

export const formatCityLabel = (city: GeoCity): string => {
  const parts = [city.name];
  if (city.state) parts.push(city.state);
  parts.push(city.country);
  return parts.join(", ");
};
