import { describe, it, expect, beforeEach } from "vitest";
import { useBlocks } from "@/composables/useBlocks";
import type { GeoCity } from "@/types/geo";

const mockCity: GeoCity = {
  name: "Kyiv",
  country: "UA",
  lat: 50.45,
  lon: 30.52,
};

describe("useBlocks", () => {
  beforeEach(() => {
    localStorage.clear();
    // Reset singleton — set one empty block
    const { blocks } = useBlocks();
    blocks.value = [{ id: crypto.randomUUID(), city: null }];
  });

  it("initially has one block", () => {
    const { blocks } = useBlocks();
    expect(blocks.value).toHaveLength(1);
  });

  it("addBlock adds a new block", () => {
    const { addBlock, blocks } = useBlocks();
    addBlock();
    expect(blocks.value).toHaveLength(2);
  });

  it("addBlock does not add more than MAX_BLOCKS", () => {
    const { addBlock, blocks, MAX_BLOCKS } = useBlocks();
    for (let i = 0; i < MAX_BLOCKS; i++) {
      addBlock();
    }
    expect(blocks.value).toHaveLength(MAX_BLOCKS);
  });

  it("removeBlock removes a block by id", () => {
    const { addBlock, removeBlock, blocks } = useBlocks();
    addBlock();
    const idToRemove = blocks.value[0]!.id;
    removeBlock(idToRemove);
    expect(blocks.value.every((b) => b.id !== idToRemove)).toBe(true);
  });

  it("updateBlockCity updates the city of a block", () => {
    const { updateBlockCity, blocks } = useBlocks();
    const id = blocks.value[0]!.id;
    updateBlockCity(id, mockCity);
    expect(blocks.value[0]!.city).toEqual(mockCity);
  });

  it("updateBlockCity does nothing for a non-existent id", () => {
    const { updateBlockCity, blocks } = useBlocks();
    updateBlockCity("non-existent-id", mockCity);
    expect(blocks.value[0]!.city).toBeNull();
  });

  it("stores blocks in localStorage", async () => {
    const { addBlock } = useBlocks();
    addBlock();
    // watch deep — wait for microtask
    await Promise.resolve();
    const stored = JSON.parse(localStorage.getItem("app-blocks") ?? "[]");
    expect(stored).toHaveLength(2);
  });
});
