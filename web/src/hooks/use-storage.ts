import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import localforage from "localforage";

export function useStorage<T>(key: string, defaultValue?: T | undefined): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
  const [value, setValue] = useState<T | undefined>(defaultValue);

  useEffect(() => {
    localforage.getItem<T>(key)
      .then((saved) => setValue(saved ?? defaultValue))
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (value === undefined) {
      localforage.removeItem(key)
        .catch(console.error);
    } else {
      localforage.setItem<T>(key, value)
        .catch(console.error);
    }
  }, [key, value]);

  return [value, setValue];
}