<template>
  <Container>
    <CitySearch @select="onCitySelect" />
    <WeatherCard
      :current-weather="currentWeather"
      :forecast="forecast"
      :is-loading="isLoading"
      :error="error"
    />
  </Container>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Container from "@/components/Container.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import CitySearch from "@/components/CitySearch.vue";
import { useWeather } from "@/composables/useWeather";
import type { GeoCity } from "@/types/geo";

const { currentWeather, forecast, isLoading, error, fetchWeather } =
  useWeather();

onMounted(() => {
  fetchWeather(50.4501, 30.5234, "uk");
});

const onCitySelect = (city: GeoCity) => {
  fetchWeather(city.lat, city.lon, "uk");
};
</script>
