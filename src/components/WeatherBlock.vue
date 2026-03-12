<template>
  <div class="weather-block">
    <div class="weather-block__toolbar">
      <CitySearch @select="onCitySelect" />

      <!-- Перемикач день / 5 днів — показуємо тільки коли є дані -->
      <div v-if="currentWeather" class="weather-block__toggle">
        <button
          class="weather-block__toggle-btn"
          :class="{ 'weather-block__toggle-btn--active': mode === 'day' }"
          @click="mode = 'day'"
        >
          Day
        </button>
        <button
          class="weather-block__toggle-btn"
          :class="{ 'weather-block__toggle-btn--active': mode === 'week' }"
          @click="mode = 'week'"
        >
          5 days
        </button>
      </div>
    </div>

    <WeatherCard
      :current-weather="currentWeather"
      :is-loading="isLoading"
      :error="error"
    >
      <template #actions>
        <slot name="actions" />
      </template>
    </WeatherCard>

    <WeatherChart
      v-if="currentWeather && chartPoints.length"
      :points="chartPoints"
      :text-color="textColor"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import CitySearch from "@/components/CitySearch.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import WeatherChart from "@/components/WeatherChart.vue";
import { useWeather } from "@/composables/useWeather";
import { useI18n } from "@/composables/useI18n";
import { getWeatherTheme } from "@/utils/weatherTheme";
import {
  getForecastForToday,
  getForecastForWeek,
  forecastToChartPoints,
} from "@/utils/forecastHelpers";
import type { GeoCity } from "@/types/geo";

const { lang } = useI18n();
const { currentWeather, forecast, isLoading, error, load } = useWeather();

const mode = ref<"day" | "week">("day");

const onCitySelect = (city: GeoCity) => {
  load(city, lang.value);
};

// Theme for passing the text color to the chart
const textColor = computed(() => {
  const condition = currentWeather.value?.weather[0];
  if (!currentWeather.value || !condition) return "#cbd5e1";
  return getWeatherTheme(
    condition.id,
    currentWeather.value.sys.sunrise,
    currentWeather.value.sys.sunset,
  ).textColor;
});

// Chart reacts to the mode toggle
const chartPoints = computed(() => {
  if (!forecast.value) return [];

  const items =
    mode.value === "day"
      ? getForecastForToday(forecast.value.list)
      : getForecastForWeek(forecast.value.list);

  return forecastToChartPoints(items, mode.value === "day" ? "time" : "date");
});
</script>

<style scoped>
.weather-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.weather-block__toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.weather-block__toggle {
  display: flex;
  flex-shrink: 0;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.weather-block__toggle-btn {
  padding: 8px 14px;
  font-size: 0.85rem;
  background: var(--color-surface);
  color: var(--color-text-secondary);
  transition:
    background 0.2s,
    color 0.2s;
}

.weather-block__toggle-btn--active {
  background: var(--color-primary);
  color: #ffffff;
}
</style>
