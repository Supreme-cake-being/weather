<template>
  <div class="weather-chart">
    <div v-if="!points.length" class="weather-chart__empty">—</div>
    <div v-else ref="containerRef" class="weather-chart__container" />
  </div>
</template>

<script setup lang="ts">
import { ref, toRef } from "vue";
import { useChart } from "@/composables/useChart";
import type { ChartPoint } from "@/types/chart";

const props = defineProps<{
  points: ChartPoint[];
}>();

const containerRef = ref<HTMLElement | null>(null);
const pointsRef = toRef(props, "points");

useChart(containerRef, pointsRef);
</script>

<style scoped>
.weather-chart {
  width: 100%;
  border-radius: 16px;
  padding: 16px;
}

.weather-chart__container {
  width: 100%;
}

.weather-chart__empty {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.4;
  font-size: 0.9rem;
}
</style>
