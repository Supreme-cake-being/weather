import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDebounce } from "@/composables/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("calls the function after the delay", () => {
    const fn = vi.fn();
    const { run } = useDebounce(fn, 300);

    run();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledOnce();
  });

  it("resets the timer on subsequent calls", () => {
    const fn = vi.fn();
    const { run } = useDebounce(fn, 300);

    run();
    vi.advanceTimersByTime(200);
    run();
    vi.advanceTimersByTime(200);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledOnce();
  });

  it("cancel cancels the call", () => {
    const fn = vi.fn();
    const { run, cancel } = useDebounce(fn, 300);

    run();
    cancel();
    vi.advanceTimersByTime(300);
    expect(fn).not.toHaveBeenCalled();
  });
});
