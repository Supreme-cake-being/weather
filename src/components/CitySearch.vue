<template>
  <div class="city-search" ref="rootRef">
    <div class="city-search__input-wrap">
      <input
        v-model="query"
        class="city-search__input"
        type="text"
        placeholder="Search city"
        autocomplete="off"
        role="combobox"
        aria-autocomplete="list"
        :aria-expanded="isOpen"
        :aria-activedescendant="
          activeIndex >= 0 ? `city-option-${activeIndex}` : undefined
        "
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
        :id="`city-option-${index}`"
        :key="`${city.lat}-${city.lon}`"
        class="city-search__item"
        :class="{ 'city-search__item--active': index === activeIndex }"
        role="option"
        :aria-selected="index === activeIndex"
        @mousedown.prevent="selectCity(city)"
        @mouseenter="activeIndex = index"
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
      No results
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { searchCities } from "@/api";
import type { GeoCity } from "@/types/geo";
import { formatCityLabel } from "@/utils/formatCity";
import { useDebounce } from "@/composables/useDebounce";
import Loader from "@/components/Loader.vue";

const emit = defineEmits<{
  select: [city: GeoCity];
}>();

const query = ref("");
const suggestions = ref<GeoCity[]>([]);
const isLoading = ref(false);
const isOpen = ref(false);
const activeIndex = ref(-1);
const rootRef = ref<HTMLElement | null>(null);

const { run: debouncedFetch, cancel: cancelFetch } = useDebounce(
  fetchSuggestions,
  400,
);

const onInput = () => {
  activeIndex.value = -1;

  if (query.value.trim().length < 2) {
    suggestions.value = [];
    isOpen.value = false;
    cancelFetch();
    return;
  }

  debouncedFetch();
};

async function fetchSuggestions() {
  isLoading.value = true;
  isOpen.value = true;

  try {
    suggestions.value = await searchCities(query.value.trim());
  } catch {
    suggestions.value = [];
  } finally {
    isLoading.value = false;
  }
}

const selectCity = (city: GeoCity) => {
  query.value = formatCityLabel(city);
  suggestions.value = [];
  isOpen.value = false;
  activeIndex.value = -1;
  emit("select", city);
};

const onArrowDown = () => {
  if (!isOpen.value || !suggestions.value.length) return;
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
  if (activeIndex.value >= 0 && city) selectCity(city);
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
  cancelFetch();
};

const onClickOutside = (e: MouseEvent) => {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) close();
};

onMounted(() => {
  document.addEventListener("mousedown", onClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", onClickOutside);
  cancelFetch();
});
</script>
