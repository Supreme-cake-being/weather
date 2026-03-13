<template>
  <div class="home">
    <div class="home__blocks">
      <WeatherBlock v-for="block in blocks" :key="block.id" class="home__block">
        <template #actions>
          <button
            v-if="blocks.length > 1"
            class="home__remove-btn"
            @click="confirmRemove(block.id)"
          >
            ✕
          </button>
        </template>
      </WeatherBlock>
    </div>

    <button
      v-if="blocks.length < MAX_BLOCKS"
      class="home__add-btn"
      @click="addBlock"
    >
      {{ t("addCity") }}
    </button>

    <Modal
      v-if="blockToRemove !== null"
      :message="t('deleteBlockMessage')"
      :confirm-text="t('delete')"
      :cancel-text="t('cancel')"
      @confirm="removeBlock"
      @cancel="cancelBlock"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import WeatherBlock from "@/components/WeatherBlock.vue";
import Modal from "@/components/Modal.vue";
import { useI18n } from "@/composables/useI18n";

const { t } = useI18n();

const MAX_BLOCKS = 5;

const blocks = ref([{ id: crypto.randomUUID() }]);
const blockToRemove = ref<string | null>(null);

const addBlock = () => {
  if (blocks.value.length >= MAX_BLOCKS) return;
  blocks.value.push({ id: crypto.randomUUID() });
};

const confirmRemove = (id: string) => (blockToRemove.value = id);

const removeBlock = () => {
  if (!blockToRemove.value) return;
  blocks.value = blocks.value.filter((b) => b.id !== blockToRemove.value);
  blockToRemove.value = null;
};

const cancelBlock = () => (blockToRemove.value = null);
</script>

<style scoped>
.home__blocks {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.home__add-btn {
  margin-top: 16px;
  width: 100%;
  padding: 14px;
  border-radius: 16px;
  border: 2px dashed var(--color-border);
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  transition:
    border-color 0.2s,
    color 0.2s;
}

.home__add-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.home__remove-btn {
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  transition: background 0.2s;
}

.home__remove-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}
</style>
