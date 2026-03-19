import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import CitySearch from "@/components/CitySearch.vue";
import type { GeoCity } from "@/types/geo";

// Mock API
vi.mock("@/api", () => ({
  searchCities: vi.fn(),
}));

import { searchCities } from "@/api";

const mockCities: GeoCity[] = [
  { name: "Kyiv", country: "UA", lat: 50.45, lon: 30.52 },
  { name: "Kharkiv", country: "UA", lat: 49.99, lon: 36.23 },
];

describe("CitySearch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with empty input", () => {
    const wrapper = mount(CitySearch);
    const input = wrapper.find("input");
    expect(input.element.value).toBe("");
  });

  it("does not show dropdown initially", () => {
    const wrapper = mount(CitySearch);
    expect(wrapper.find(".city-search__dropdown").exists()).toBe(false);
  });

  it("does not make request if less than 2 characters are entered", async () => {
    const wrapper = mount(CitySearch);
    const input = wrapper.find("input");

    await input.setValue("K");
    await input.trigger("input");
    vi.advanceTimersByTime(400);

    expect(searchCities).not.toHaveBeenCalled();
  });

  it("makes request after debounce when 2+ characters are entered", async () => {
    vi.mocked(searchCities).mockResolvedValue(mockCities);

    const wrapper = mount(CitySearch);
    const input = wrapper.find("input");

    await input.setValue("Ky");
    await input.trigger("input");

    expect(searchCities).not.toHaveBeenCalled();
    vi.advanceTimersByTime(400);
    expect(searchCities).toHaveBeenCalledWith("Ky");
  });

  it("shows results after successful request", async () => {
    vi.mocked(searchCities).mockResolvedValue(mockCities);

    const wrapper = mount(CitySearch);
    const input = wrapper.find("input");

    await input.setValue("Ky");
    await input.trigger("input");
    vi.advanceTimersByTime(400);
    await vi.runAllTimersAsync();
    await wrapper.vm.$nextTick();

    const items = wrapper.findAll(".city-search__item");
    expect(items).toHaveLength(2);
  });

  it("shows empty state if no results are found", async () => {
    vi.mocked(searchCities).mockResolvedValue([]);

    const wrapper = mount(CitySearch);
    const input = wrapper.find("input");

    await input.setValue("Xy");
    await input.trigger("input");
    vi.advanceTimersByTime(400);
    await vi.runAllTimersAsync();
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".city-search__empty").exists()).toBe(true);
  });

  it("emits select event when a city is clicked", async () => {
    vi.mocked(searchCities).mockResolvedValue(mockCities);

    const wrapper = mount(CitySearch);
    const input = wrapper.find("input");

    await input.setValue("Ky");
    await input.trigger("input");
    vi.advanceTimersByTime(400);
    await vi.runAllTimersAsync();
    await wrapper.vm.$nextTick();

    await wrapper.find(".city-search__item").trigger("mousedown");
    expect(wrapper.emitted("select")).toHaveLength(1);
    expect(wrapper.emitted("select")![0]).toEqual([mockCities[0]]);
  });

  it("closes dropdown and populates input after selecting a city", async () => {
    vi.mocked(searchCities).mockResolvedValue(mockCities);

    const wrapper = mount(CitySearch);
    const input = wrapper.find("input");

    await input.setValue("Ky");
    await input.trigger("input");
    vi.advanceTimersByTime(400);
    await vi.runAllTimersAsync();
    await wrapper.vm.$nextTick();

    await wrapper.find(".city-search__item").trigger("mousedown");
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".city-search__dropdown").exists()).toBe(false);
    expect((input.element as HTMLInputElement).value).toContain("Kyiv");
  });

  it("ArrowDown moves activeIndex down", async () => {
    vi.mocked(searchCities).mockResolvedValue(mockCities);

    const wrapper = mount(CitySearch);
    const input = wrapper.find("input");

    await input.setValue("Ky");
    await input.trigger("input");
    vi.advanceTimersByTime(400);
    await vi.runAllTimersAsync();
    await wrapper.vm.$nextTick();

    await input.trigger("keydown.down");
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".city-search__item--active").exists()).toBe(true);
  });

  it("Enter selects the active city", async () => {
    vi.mocked(searchCities).mockResolvedValue(mockCities);

    const wrapper = mount(CitySearch);
    const input = wrapper.find("input");

    await input.setValue("Ky");
    await input.trigger("input");
    vi.advanceTimersByTime(400);
    await vi.runAllTimersAsync();
    await wrapper.vm.$nextTick();

    await input.trigger("keydown.down");
    await input.trigger("keydown.enter");

    expect(wrapper.emitted("select")).toHaveLength(1);
  });

  it("Esc closes dropdown", async () => {
    vi.mocked(searchCities).mockResolvedValue(mockCities);

    const wrapper = mount(CitySearch);
    const input = wrapper.find("input");

    await input.setValue("Ky");
    await input.trigger("input");
    vi.advanceTimersByTime(400);
    await vi.runAllTimersAsync();
    await wrapper.vm.$nextTick();

    await input.trigger("keydown.esc");
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".city-search__dropdown").exists()).toBe(false);
  });

  it("clear button clears the input", async () => {
    const wrapper = mount(CitySearch);
    const input = wrapper.find("input");

    await input.setValue("Kyiv");
    await input.trigger("input");
    await wrapper.vm.$nextTick();

    const clearBtn = wrapper.find(".city-search__clear");
    expect(clearBtn.exists()).toBe(true);

    await clearBtn.trigger("click");
    expect((input.element as HTMLInputElement).value).toBe("");
  });
});
