export const loadState = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state, key: string) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
    // eslint-disable-next-line no-empty
  } catch {}
};
