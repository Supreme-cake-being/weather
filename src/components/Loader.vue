<template>
  <div class="loader" :class="`loader--${size}`">
    <div class="loader__spinner" />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: "sm" | "md" | "lg";
  }>(),
  {
    size: "md",
  },
);
</script>

<style scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader--sm {
  padding: 8px;
}
.loader--md {
  padding: 24px;
}
.loader--lg {
  padding: 48px;
}

.loader__spinner {
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.15);
  border-top-color: #a9a9a9;
  animation: spin 0.7s linear infinite;
}

.loader--sm .loader__spinner {
  width: 18px;
  height: 18px;
}
.loader--md .loader__spinner {
  width: 32px;
  height: 32px;
}
.loader--lg .loader__spinner {
  width: 48px;
  height: 48px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
