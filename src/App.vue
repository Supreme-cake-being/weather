<script setup lang="ts">
import { onMounted } from "vue";
import Container from "@/components/Container.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import { useWeather } from "@/composables/useWeather";

const { currentWeather, isLoading, error, fetchWeather } = useWeather();

// Київ — для тесту
onMounted(() => {
  fetchWeather(38.896887, -77.03651, "uk");
});

const t = (key: string): string => {
  const translations: Record<string, string> = {
    feelsLike: "Відчувається як",
    humidity: "Вологість",
    wind: "Вітер",
    pressure: "Тиск",
    sunrise: "Схід",
    sunset: "Захід",
  };
  return translations[key] ?? key;
};
</script>

<template>
  <Container>
    <WeatherCard
      :current-weather="currentWeather"
      :is-loading="isLoading"
      :error="error"
      :t="t"
    />
  </Container>
</template>

<style scoped></style>
