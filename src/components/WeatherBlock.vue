<template>
  <div class="weather-block">
    <div class="weather-block__toolbar">
      <!-- Show city search if component is not readonly -->
      <CitySearch v-if="!initialCity" @select="onCitySelect" />

      <!-- Toggle day / 5 days -->
      <div v-if="currentWeather" class="weather-block__toggle">
        <button
          class="weather-block__toggle-btn"
          :class="{ 'weather-block__toggle-btn--active': mode === 'day' }"
          @click="mode = 'day'"
        >
          {{ t("day") }}
        </button>
        <button
          class="weather-block__toggle-btn"
          :class="{ 'weather-block__toggle-btn--active': mode === 'week' }"
          @click="mode = 'week'"
        >
          {{ t("fiveDays") }}
        </button>

        <slot name="actions" />
      </div>
    </div>

    <div class="weather-block__card-wrap" :style="wrapStyle">
      <WeatherCard
        v-if="currentWeather"
        :current-weather="currentWeather"
        :is-loading="isLoading"
        :error="error"
      >
        <template #actions>
          <button
            v-if="currentWeather"
            class="weather-block__fav-btn"
            :title="isFav ? t('removeFromFavorites') : t('addToFavorites')"
            @click="onToggleFavorite"
          >
            {{ isFav ? "★" : "☆" }}
          </button>
        </template>
      </WeatherCard>

      <WeatherChart
        v-if="currentWeather && chartPoints.length"
        :points="chartPoints"
        :text-color="textColor"
      />
    </div>

    <Modal
      v-if="showLimitModal"
      :message="t('favoritesLimitMessage')"
      :confirm-text="t('ok')"
      @confirm="showLimitModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import CitySearch from "@/components/CitySearch.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import WeatherChart from "@/components/WeatherChart.vue";
import { useWeather } from "@/composables/useWeather";
import { useI18n } from "@/composables/useI18n";
import { useFavorites } from "@/composables/useFavorites";
import { getWeatherTheme } from "@/utils/weatherTheme";
import {
  getForecastForToday,
  getForecastForWeek,
  forecastToChartPoints,
} from "@/utils/forecastHelpers";
import type { GeoCity } from "@/types/geo";

const props = defineProps<{
  initialCity?: GeoCity; // if passed - component is readonly
}>();

const { lang, t } = useI18n();
const { currentWeather, forecast, isLoading, error, load, selectedCity } =
  useWeather();
const { isFavorite, toggle } = useFavorites();

const mode = ref<"day" | "week">("day");
const showLimitModal = ref(false);

onMounted(() => {
  if (props.initialCity) {
    load(props.initialCity, lang.value);
  }
});

const onCitySelect = (city: GeoCity) => {
  load(city, lang.value);
};

const isFav = computed(() =>
  selectedCity.value ? isFavorite(selectedCity.value) : false,
);

const onToggleFavorite = () => {
  if (!selectedCity.value) return;
  const success = toggle(selectedCity.value);
  if (!success) showLimitModal.value = true;
};

const theme = computed(() => {
  const condition = currentWeather.value?.weather[0];
  if (!currentWeather.value || !condition) return null;
  return getWeatherTheme(
    condition.id,
    currentWeather.value.sys.sunrise,
    currentWeather.value.sys.sunset,
  );
});

const wrapStyle = computed(() => ({
  background:
    theme.value?.gradient ?? "linear-gradient(135deg, #2980b9, #6dd5fa)",
  color: theme.value?.textColor ?? "#ffffff",
}));

const textColor = computed(() => theme.value?.textColor ?? "#ffffff");

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

.weather-block__card-wrap {
  border-radius: 24px;
  overflow: hidden;
  transition: background 1s ease;
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

.weather-block__toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.weather-block__fav-btn {
  font-size: 1.3rem;
  line-height: 1;
  padding: 4px;
  color: inherit;
  opacity: 0.85;
  transition:
    opacity 0.2s,
    transform 0.15s;
}

.weather-block__fav-btn:hover {
  opacity: 1;
  transform: scale(1.15);
}
</style>
