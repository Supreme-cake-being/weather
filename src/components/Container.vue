<template>
  <div class="container">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--container-padding-sm);
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
    padding: 0 var(--container-padding-md);
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
    padding: 0 var(--container-padding-md);
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1200px;
    padding: 0 var(--container-padding-lg);
  }
}
</style>
