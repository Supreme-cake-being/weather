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

        <div class="app-header__controls">
          <button
            class="app-header__theme-btn"
            :title="t('toggleTheme')"
            @click="toggleTheme"
          >
            {{ theme === "dark" ? "☀️" : "🌙" }}
          </button>

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
      </div>
    </Container>
  </header>
</template>

<script setup lang="ts">
import Container from "@/components/Container.vue";
import { useI18n } from "@/composables/useI18n";
import { useTheme } from "@/composables/useTheme";
import type { Lang } from "@/constants/translations";

defineProps<{
  activeTab: "home" | "favorites";
}>();

const emit = defineEmits<{
  "tab-change": [tab: "home" | "favorites"];
}>();

const { lang, setLang, t } = useI18n();
const { theme, toggleTheme } = useTheme();
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

/* Mobile — grid 2x2:
   [логотип]  [controls]
   [nav    ]  [nav     ]
*/
.app-header__inner {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "logo controls"
    "nav  nav";
  align-items: center;
  padding: 10px 0;
  gap: 8px 16px;
}

.app-header__logo {
  grid-area: logo;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-primary);
}

.app-header__nav {
  grid-area: nav;
  display: flex;
  gap: 4px;
}

.app-header__controls {
  grid-area: controls;
  display: flex;
  align-items: center;
  gap: 8px;
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

.app-header__theme-btn {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  font-size: 1rem;
  transition: background 0.2s;
}

.app-header__theme-btn:hover {
  background: var(--color-border);
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

/* Desktop — one row: [логотип] → [nav] [controls] */
@media (min-width: 768px) {
  .app-header__inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 60px;
    padding: 0;
    gap: 16px;
  }

  .app-header__logo {
    margin-right: auto;
  }
}
</style>
