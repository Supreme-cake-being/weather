<template>
  <div class="app">
    <AppHeader :active-tab="activeTab" @tab-change="activeTab = $event" />
    <main class="app__main">
      <Container>
        <HomeView v-if="activeTab === 'home'" />
        <!-- <FavoritesView v-else /> -->
      </Container>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import Container from "@/components/Container.vue";
import HomeView from "@/views/HomeView.vue";
// import FavoritesView from "@/views/FavoritesView.vue";

const activeTab = ref<"home" | "favorites">("home");
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: var(--color-bg);
}

.app__main {
  padding: 24px 0;
}
</style>
