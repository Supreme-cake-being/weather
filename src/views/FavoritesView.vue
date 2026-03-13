<template>
  <div class="favorites">
    <p v-if="!favorites.length" class="favorites__empty">
      {{ t("favoritesEmpty") }}
    </p>

    <div v-else class="favorites__blocks">
      <WeatherBlock
        v-for="city in favorites"
        :key="`${city.lat}-${city.lon}`"
        :initial-city="city"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import WeatherBlock from "@/components/WeatherBlock.vue";
import { useFavorites } from "@/composables/useFavorites";
import { useI18n } from "@/composables/useI18n";

const { favorites } = useFavorites();
const { t } = useI18n();
</script>

<style scoped>
.favorites__empty {
  text-align: center;
  padding: 60px 0;
  color: var(--color-text-secondary);
  font-size: 1rem;
}

.favorites__blocks {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
