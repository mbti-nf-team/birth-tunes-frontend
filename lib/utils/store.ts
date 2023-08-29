// eslint-disable-next-line import/prefer-default-export
export const getStore = <T = unknown>(keys: keyof T | (keyof T)[]) => (
  store: T,
) => {
  if (Array.isArray(keys)) {
    const pickStore = keys
      .reduce((prev: Partial<Record<keyof T, T[keyof T]>>, key) => ({
        ...prev,
        [key]: store[key],
      }), {});

    return pickStore;
  }

  return {
    [keys]: store[keys],
  };
};
