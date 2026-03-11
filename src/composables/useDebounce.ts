export const useDebounce = (fn: () => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const run = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };

  const cancel = () => {
    if (timer) clearTimeout(timer);
  };

  return { run, cancel };
};
