import { useEffect, useRef } from "react";

export function useDebounce(callback: Function, delay: number) {
  const argsRef = useRef<any[]>();
  const timeout = useRef<NodeJS.Timeout>();

  function debouncedFunction(...args: any[]) {
    argsRef.current = args;
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      if (argsRef.current) {
        callback(...argsRef.current);
      }
    }, delay);
  }

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [delay]);

  return debouncedFunction;
}
