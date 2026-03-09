import { watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import type { Ref } from "vue";
import ApexCharts from "apexcharts";
import type { ApexOptions } from "apexcharts";
import { TEMP_COLORS } from "@/constants/tempColors";
import type { ChartPoint } from "@/types/chart";

const getTempColor = (temp: number): string => {
  if (temp <= 0) return TEMP_COLORS.freezing;
  if (temp <= 10) return TEMP_COLORS.cold;
  if (temp <= 20) return TEMP_COLORS.warm;
  if (temp <= 30) return TEMP_COLORS.hot;
  return TEMP_COLORS.veryHot;
};

const buildOptions = (points: ChartPoint[]): ApexOptions => ({
  chart: {
    type: "area",
    height: 180,
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: { enabled: true, speed: 400 },
    background: "transparent",
    fontFamily: "inherit",
  },
  series: [
    {
      name: "Температура",
      data: points.map((p) => p.temp),
    },
  ],
  xaxis: {
    categories: points.map((p) => p.time),
    labels: {
      style: { colors: "#cbd5e1", fontSize: "11px" },
    },
    axisBorder: { color: "rgba(148,163,184,0.2)" },
    axisTicks: { color: "rgba(148,163,184,0.2)" },
    tooltip: { enabled: false },
  },
  yaxis: {
    labels: {
      style: { colors: "#cbd5e1", fontSize: "11px" },
      formatter: (val) => `${val}°`,
    },
  },
  dataLabels: {
    enabled: true,
    formatter: (val) => `${val}°`,
    style: {
      fontSize: "11px",
      fontWeight: "600",
      colors: points.map((p) => getTempColor(p.temp)),
    },
    background: { enabled: false },
    offsetY: -6,
  },
  stroke: {
    curve: "smooth",
    width: 2,
    colors: ["#60a5fa"],
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.35,
      opacityTo: 0.02,
      colorStops: [
        { offset: 0, color: "#60a5fa", opacity: 0.35 },
        { offset: 100, color: "#60a5fa", opacity: 0.02 },
      ],
    },
  },
  markers: {
    size: 5,
    colors: points.map((p) => getTempColor(p.temp)),
    strokeColors: "rgba(15,23,42,0.8)",
    strokeWidth: 1.5,
    hover: { size: 7 },
  },
  grid: {
    borderColor: "rgba(148,163,184,0.15)",
    strokeDashArray: 3,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } },
    padding: { top: 16, right: 16, bottom: 0, left: 8 },
  },
  tooltip: {
    theme: "dark",
    y: { formatter: (val) => `${val}°C` },
  },
  legend: { show: false },
});

export const useChart = (
  containerRef: Ref<HTMLElement | null>,
  points: Ref<ChartPoint[]>,
) => {
  let chart: ApexCharts | null = null;

  const initChart = async () => {
    await nextTick();
    if (!containerRef.value || !points.value.length) return;

    chart = new ApexCharts(containerRef.value, buildOptions(points.value));
    await chart.render();
  };

  const destroyChart = () => {
    chart?.destroy();
    chart = null;
  };

  onMounted(() => {
    if (points.value.length) initChart();
  });

  watch(
    points,
    async (newPoints) => {
      if (!newPoints.length) return;
      destroyChart();
      await initChart();
    },
    { deep: true },
  );

  onBeforeUnmount(destroyChart);
};
