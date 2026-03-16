<template>
  <div class="app">
    <AppHeader :active-tab="activeTab" @tab-change="activeTab = $event" />
    <main class="app__main">
      <Container>
        <HomeView v-if="activeTab === 'home'" />
        <FavoritesView v-else />
      </Container>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import Container from "@/components/Container.vue";
import HomeView from "@/views/HomeView.vue";
import FavoritesView from "@/views/FavoritesView.vue";
import { STORAGE_KEYS } from "@/constants/storageKeys";

type Tab = "home" | "favorites";

const getInitialTab = (): Tab => {
  const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_TAB);
  return saved === "favorites" ? "favorites" : "home";
};

const activeTab = ref<Tab>(getInitialTab());

watch(activeTab, (val) => localStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, val));
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
