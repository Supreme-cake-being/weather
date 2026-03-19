import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "happy-dom",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/components/**", "src/composables/**", "src/utils/**"],
      exclude: [
        "src/composables/useChart.ts",
        "src/components/AppHeader.vue",
        "src/components/Container.vue",
        "src/components/Loader.vue",
        "src/components/WeatherCard.vue",
        "src/components/WeatherChart.vue",
      ],
    },
  },
});
