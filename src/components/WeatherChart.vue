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
  textColor?: string;
}>();

const containerRef = ref<HTMLElement | null>(null);

useChart(
  containerRef,
  toRef(() => props.points),
  toRef(() => props.textColor ?? "#cbd5e1"),
);
</script>
