<template>
  <div class="weather-card" :style="cardStyle">
    <Loader v-if="isLoading" size="lg" />

    <div v-else-if="error" class="weather-card__error">
      {{ error }}
    </div>

    <template v-else-if="currentWeather && currentWeather.weather[0]">
      <!-- HEADER -->
      <div class="weather-card__header">
        <div class="weather-card__location">
          <h2 class="weather-card__city">
            {{ currentWeather.name }}, {{ currentWeather.sys.country }}
          </h2>
          <p class="weather-card__date">{{ formattedDate }}</p>
        </div>

        <slot name="actions" />
      </div>

      <!-- MAIN -->
      <div class="weather-card__main">
        <div class="weather-card__temp-wrap">
          <img
            class="weather-card__icon"
            :src="iconUrl"
            :alt="currentWeather.weather[0]?.description"
          />
          <span class="weather-card__temp">
            {{ Math.round(currentWeather.main.temp) }}°C
          </span>
        </div>

        <p class="weather-card__description">
          {{ currentWeather.weather[0]?.description }}
        </p>

        <p class="weather-card__feels-like">
          {{ t("feelsLike") }}:
          {{ Math.round(currentWeather.main.feels_like) }}°C
        </p>
      </div>

      <!-- DETAILS -->
      <div class="weather-card__details">
        <div class="weather-card__detail">
          <span class="weather-card__detail-icon">💧</span>
          <span class="weather-card__detail-label">{{ t("humidity") }}</span>
          <span class="weather-card__detail-value">
            {{ currentWeather.main.humidity }}%
          </span>
        </div>

        <div class="weather-card__detail">
          <span class="weather-card__detail-icon">💨</span>
          <span class="weather-card__detail-label">{{ t("wind") }}</span>
          <span class="weather-card__detail-value">
            {{ Math.round(currentWeather.wind.speed) }} m/s
          </span>
        </div>

        <div class="weather-card__detail">
          <span class="weather-card__detail-icon">🔵</span>
          <span class="weather-card__detail-label">{{ t("pressure") }}</span>
          <span class="weather-card__detail-value">
            {{ currentWeather.main.pressure }} hPa
          </span>
        </div>

        <div class="weather-card__detail">
          <span class="weather-card__detail-icon">🌅</span>
          <span class="weather-card__detail-label">{{ t("sunrise") }}</span>
          <span class="weather-card__detail-value">
            {{ formatTime(currentWeather.sys.sunrise) }}
          </span>
        </div>

        <div class="weather-card__detail">
          <span class="weather-card__detail-icon">🌇</span>
          <span class="weather-card__detail-label">{{ t("sunset") }}</span>
          <span class="weather-card__detail-value">
            {{ formatTime(currentWeather.sys.sunset) }}
          </span>
        </div>
      </div>

      <WeatherChart :points="todayPoints" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import WeatherChart from "@/components/WeatherChart.vue";
import Loader from "@/components/Loader.vue";
import { useI18n } from "@/composables/useI18n";
import { useForecastChart } from "@/composables/useForecastChart";
import { getWeatherTheme } from "@/utils/weatherTheme";
import type { CurrentWeather } from "@/types/weather";
import type { ForecastResponse } from "@/types/forecast";

const props = defineProps<{
  currentWeather: CurrentWeather | null;
  forecast: ForecastResponse | null;
  isLoading: boolean;
  error: string | null;
}>();

const { t } = useI18n();
const { todayPoints } = useForecastChart(computed(() => props.forecast));

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
  const condition = props.currentWeather?.weather[0];
  if (!condition) return "";
  return `https://openweathermap.org/img/wn/${condition.icon}@2x.png`;
});

const formattedDate = computed(() => {
  return new Date().toLocaleDateString("uk-UA", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
});

const formatTime = (unix: number): string => {
  return new Date(unix * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<style scoped>
.weather-card {
  border-radius: 24px;
  padding: 24px;
  min-height: 200px;
  transition: background 1s ease;
}

.weather-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}

.weather-card__city {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.weather-card__date {
  font-size: 0.875rem;
  opacity: 0.75;
  text-transform: capitalize;
}

.weather-card__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
  margin-bottom: 24px;
}

.weather-card__temp-wrap {
  display: flex;
  align-items: center;
}

.weather-card__icon {
  width: 80px;
  height: 80px;
}

.weather-card__temp {
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -2px;
}

.weather-card__description {
  font-size: 1.1rem;
  text-transform: capitalize;
  opacity: 0.9;
}

.weather-card__feels-like {
  font-size: 0.875rem;
  opacity: 0.7;
}

.weather-card__details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

@media (min-width: 480px) {
  .weather-card__details {
    grid-template-columns: repeat(3, 1fr);
  }
}

.weather-card__detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  border-radius: 12px;
  text-align: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
}

.weather-card__detail-icon {
  font-size: 1.3rem;
}

.weather-card__detail-label {
  font-size: 0.7rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.weather-card__detail-value {
  font-size: 0.95rem;
  font-weight: 600;
}

.weather-card__error {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #ef5350;
  font-size: 0.9rem;
}
</style>
