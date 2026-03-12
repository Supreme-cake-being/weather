<template>
  <div class="weather-card" :style="cardStyle">
    <Loader v-if="isLoading" size="lg" />

    <div v-else-if="error" class="weather-card__error">
      {{ error }}
    </div>

    <template v-else-if="currentWeather && currentWeather.weather[0]">
      <div class="weather-card__header">
        <div class="weather-card__location">
          <h2 class="weather-card__city">
            {{ currentWeather.name }}, {{ currentWeather.sys.country }}
          </h2>
          <p class="weather-card__date">{{ formattedDate }}</p>
        </div>
        <slot name="actions" />
      </div>

      <div class="weather-card__main">
        <div class="weather-card__temp-wrap">
          <img
            class="weather-card__icon"
            :src="iconUrl"
            :alt="currentWeather.weather[0].description"
          />
          <span class="weather-card__temp">
            {{ Math.round(currentWeather.main.temp) }}°C
          </span>
        </div>
        <p class="weather-card__description">
          {{ currentWeather.weather[0].description }}
        </p>
        <p class="weather-card__feels-like">
          Feels like: {{ Math.round(currentWeather.main.feels_like) }}°C
        </p>
      </div>

      <div class="weather-card__details">
        <div
          v-for="detail in details"
          :key="detail.label"
          class="weather-card__detail"
        >
          <span class="weather-card__detail-icon">{{ detail.icon }}</span>
          <span class="weather-card__detail-label">{{ detail.label }}</span>
          <span class="weather-card__detail-value">{{ detail.value }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Loader from "@/components/Loader.vue";
import { getWeatherTheme } from "@/utils/weatherTheme";
import type { CurrentWeather } from "@/types/weather";

const props = defineProps<{
  currentWeather: CurrentWeather | null;
  isLoading: boolean;
  error: string | null;
}>();

const theme = computed(() => {
  const condition = props.currentWeather?.weather[0];
  if (!props.currentWeather || !condition) return null;
  return getWeatherTheme(
    condition.id,
    props.currentWeather.sys.sunrise,
    props.currentWeather.sys.sunset,
  );
});

const cardStyle = computed(() => ({
  background:
    theme.value?.gradient ?? "linear-gradient(135deg, #2980b9, #6dd5fa)",
  color: theme.value?.textColor ?? "#ffffff",
}));

const iconUrl = computed(() => {
  const icon = props.currentWeather?.weather[0]?.icon;
  return icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : "";
});

const formattedDate = computed(() =>
  new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  }),
);

const formatTime = (unix: number): string =>
  new Date(unix * 1000).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

const details = computed(() => {
  const w = props.currentWeather;
  if (!w) return [];

  return [
    { icon: "💧", label: "Humidity", value: `${w.main.humidity}%` },
    { icon: "💨", label: "Wind", value: `${Math.round(w.wind.speed)} m/s` },
    { icon: "🔵", label: "Pressure", value: `${w.main.pressure} hPa` },
    { icon: "🌅", label: "Sunrise", value: formatTime(w.sys.sunrise) },
    { icon: "🌇", label: "Sunset", value: formatTime(w.sys.sunset) },
  ];
});
</script>
