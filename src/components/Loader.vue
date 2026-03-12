<template>
  <div
    class="loader"
    :class="`loader--${size}`"
    role="status"
    :aria-label="label"
  >
    <div class="loader__spinner" />
    <span class="loader__sr-text">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: "sm" | "md" | "lg";
    label?: string;
  }>(),
  {
    size: "md",
    label: "Loading...",
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
  border: 3px solid var(--loader-track-color);
  border-top-color: var(--loader-spin-color);
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
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

/* Візуально приховано, але доступно screen readers */
.loader__sr-text {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
