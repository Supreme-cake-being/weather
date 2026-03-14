import { ref, watch } from "vue";
import type { GeoCity } from "@/types/geo";
import { STORAGE_KEYS } from "@/constants/storageKeys";

const MAX_BLOCKS = 5;

interface Block {
  id: string;
  city: GeoCity | null;
}

const readFromStorage = (): Block[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BLOCKS);
    const parsed = raw ? (JSON.parse(raw) as Block[]) : [];
    return parsed.length ? parsed : [{ id: crypto.randomUUID(), city: null }];
  } catch {
    return [{ id: crypto.randomUUID(), city: null }];
  }
};

// Singleton
const blocks = ref<Block[]>(readFromStorage());

watch(
  blocks,
  (val) => localStorage.setItem(STORAGE_KEYS.BLOCKS, JSON.stringify(val)),
  {
    deep: true,
  },
);

export const useBlocks = () => {
  const addBlock = () => {
    if (blocks.value.length >= MAX_BLOCKS) return;
    blocks.value.push({ id: crypto.randomUUID(), city: null });
  };

  const removeBlock = (id: string) => {
    blocks.value = blocks.value.filter((b) => b.id !== id);
  };

  const updateBlockCity = (id: string, city: GeoCity) => {
    const block = blocks.value.find((b) => b.id === id);
    if (block) block.city = city;
  };

  return { blocks, addBlock, removeBlock, updateBlockCity, MAX_BLOCKS };
};
