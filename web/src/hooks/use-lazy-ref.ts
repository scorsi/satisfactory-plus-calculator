import { useCallback, useRef } from "react";

const none = {};
export const useLazyRef = <T>(init: () => T): (() => T) => {
  const value = useRef<T>(none as T);
  return useCallback(() => {
    if (value.current === none) {
      value.current = init();
    }
    return value.current;
  }, []);
};
