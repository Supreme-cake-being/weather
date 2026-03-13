<template>
  <header class="app-header">
    <Container>
      <div class="app-header__inner">
        <div class="app-header__logo">⛅ Weather</div>

        <nav class="app-header__nav">
          <button
            class="app-header__tab"
            :class="{ 'app-header__tab--active': activeTab === 'home' }"
            @click="emit('tab-change', 'home')"
          >
            {{ t("home") }}
          </button>
          <button
            class="app-header__tab"
            :class="{ 'app-header__tab--active': activeTab === 'favorites' }"
            @click="emit('tab-change', 'favorites')"
          >
            {{ t("favorites") }}
          </button>
        </nav>

        <!-- Перемикач мови -->
        <div class="app-header__lang">
          <button
            v-for="l in langs"
            :key="l"
            class="app-header__lang-btn"
            :class="{ 'app-header__lang-btn--active': lang === l }"
            @click="setLang(l)"
          >
            {{ l.toUpperCase() }}
          </button>
        </div>
      </div>
    </Container>
  </header>
</template>

<script setup lang="ts">
import Container from "@/components/Container.vue";
import { useI18n } from "@/composables/useI18n";
import type { Lang } from "@/constants/translations";

defineProps<{
  activeTab: "home" | "favorites";
}>();

const emit = defineEmits<{
  "tab-change": [tab: "home" | "favorites"];
}>();

const { lang, setLang, t } = useI18n();
const langs: Lang[] = ["uk", "en"];
</script>

<style scoped>
.app-header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 10;
}

.app-header__inner {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 60px;
}

.app-header__logo {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-right: auto;
}

.app-header__nav {
  display: flex;
  gap: 4px;
}

.app-header__tab {
  padding: 6px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  transition:
    background 0.2s,
    color 0.2s;
}

.app-header__tab--active {
  background: var(--color-primary);
  color: #ffffff;
}

.app-header__lang {
  display: flex;
  gap: 4px;
}

.app-header__lang-btn {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  transition:
    background 0.2s,
    color 0.2s;
}

.app-header__lang-btn--active {
  background: var(--color-primary);
  color: #ffffff;
}
</style>
