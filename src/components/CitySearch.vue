<template>
  <div class="city-search" ref="rootRef">
    <div class="city-search__input-wrap">
      <input
        v-model="query"
        class="city-search__input"
        type="text"
        :placeholder="t('searchCity')"
        autocomplete="off"
        @input="onInput"
        @keydown.down.prevent="onArrowDown"
        @keydown.up.prevent="onArrowUp"
        @keydown.enter.prevent="onEnter"
        @keydown.esc="close"
        @focus="onFocus"
      />

      <div v-if="isLoading" class="city-search__loader">
        <Loader size="sm" />
      </div>
      <button v-else-if="query" class="city-search__clear" @click="clear">
        ✕
      </button>
    </div>

    <ul
      v-if="isOpen && suggestions.length"
      class="city-search__dropdown"
      role="listbox"
    >
      <li
        v-for="(city, index) in suggestions"
        :key="`${city.lat}-${city.lon}`"
        class="city-search__item"
        :class="{ 'city-search__item--active': index === activeIndex }"
        role="option"
        @mousedown.prevent="selectCity(city)"
        @mouseover="activeIndex = index"
      >
        <span class="city-search__item-name">{{ city.name }}</span>
        <span class="city-search__item-meta">
          {{ city.state ? `${city.state}, ` : "" }}{{ city.country }}
        </span>
      </li>
    </ul>

    <p
      v-else-if="isOpen && !suggestions.length && !isLoading"
      class="city-search__empty"
    >
      {{ t("noResults") }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { searchCities } from "@/api";
import type { GeoCity } from "@/types/geo";
import Loader from "@/components/Loader.vue";
import { useI18n } from "@/composables/useI18n";

const { t } = useI18n();

const emit = defineEmits<{
  select: [city: GeoCity];
}>();

const query = ref("");
const suggestions = ref<GeoCity[]>([]);
const isLoading = ref(false);
const isOpen = ref(false);
const activeIndex = ref(-1);
const rootRef = ref<HTMLElement | null>(null);

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const onInput = () => {
  activeIndex.value = -1;

  if (debounceTimer) clearTimeout(debounceTimer);

  if (query.value.trim().length < 2) {
    suggestions.value = [];
    isOpen.value = false;
    return;
  }

  debounceTimer = setTimeout(fetchSuggestions, 400);
};

const fetchSuggestions = async () => {
  isLoading.value = true;
  isOpen.value = true;

  try {
    suggestions.value = await searchCities(query.value.trim());
  } catch {
    suggestions.value = [];
  } finally {
    isLoading.value = false;
  }
};

const selectCity = (city: GeoCity) => {
  query.value = formatCityLabel(city);
  isOpen.value = false;
  suggestions.value = [];
  activeIndex.value = -1;
  emit("select", city);
};

const formatCityLabel = (city: GeoCity): string => {
  const parts = [city.name];
  if (city.state) parts.push(city.state);
  parts.push(city.country);
  return parts.join(", ");
};

const onArrowDown = () => {
  if (!isOpen.value) return;
  activeIndex.value = Math.min(
    activeIndex.value + 1,
    suggestions.value.length - 1,
  );
};

const onArrowUp = () => {
  if (!isOpen.value) return;
  activeIndex.value = Math.max(activeIndex.value - 1, 0);
};

const onEnter = () => {
  const city = suggestions.value[activeIndex.value];
  if (activeIndex.value >= 0 && city) {
    selectCity(city);
  }
};

const onFocus = () => {
  if (suggestions.value.length) isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
  activeIndex.value = -1;
};

const clear = () => {
  query.value = "";
  suggestions.value = [];
  isOpen.value = false;
  activeIndex.value = -1;
};

const onClickOutside = (e: MouseEvent) => {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
    close();
  }
};

document.addEventListener("mousedown", onClickOutside);

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", onClickOutside);
  if (debounceTimer) clearTimeout(debounceTimer);
});
</script>

<style scoped>
.city-search {
  position: relative;
  width: 100%;
}

.city-search__input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.city-search__input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
  background: #fff;
}

.city-search__input:focus {
  border-color: #2980b9;
}

.city-search__loader {
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.city-search__clear {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  color: #9e9e9e;
  padding: 4px;
  line-height: 1;
  transition: color 0.2s;
}

.city-search__clear:hover {
  color: #424242;
}

.city-search__dropdown {
  position: absolute;
  top: calc(100%);
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
}

.city-search__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 16px;
  cursor: pointer;
}

.city-search__item--active,
.city-search__item:hover {
  background: #f5f5f5;
}

.city-search__item-name {
  font-size: 0.9rem;
  font-weight: 500;
}

.city-search__item-meta {
  font-size: 0.8rem;
  color: #9e9e9e;
  white-space: nowrap;
}

.city-search__empty {
  position: absolute;
  top: calc(100%);
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 0.875rem;
  color: #9e9e9e;
  text-align: center;
}
</style>
