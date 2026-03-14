<template>
  <div class="home">
    <div class="home__blocks">
      <WeatherBlock
        v-for="block in blocks"
        :key="block.id"
        :block-id="block.id"
        :initial-city="block.city ?? undefined"
        class="home__block"
        @city-selected="updateBlockCity"
      >
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
      @confirm="removeBlock(blockToRemove!)"
      @cancel="cancelBlock"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import WeatherBlock from "@/components/WeatherBlock.vue";
import Modal from "@/components/Modal.vue";
import { useI18n } from "@/composables/useI18n";
import { useBlocks } from "@/composables/useBlocks";
import { useGeolocation } from "@/composables/useGeolocation";

const { t } = useI18n();
const { blocks, addBlock, removeBlock, updateBlockCity, MAX_BLOCKS } =
  useBlocks();
const { detectCity } = useGeolocation();

const blockToRemove = ref<string | null>(null);

onMounted(async () => {
  if (blocks.value[0] && !blocks.value[0].city) {
    const city = await detectCity();
    if (city) updateBlockCity(blocks.value[0].id, city);
  }
});

const confirmRemove = (id: string) => (blockToRemove.value = id);
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
  color: rgba(66, 62, 62, 0.7);
  transition: background 0.2s;
}

.home__remove-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}
</style>
