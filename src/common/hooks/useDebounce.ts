import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const setDebounced = useCallback(
    debounce((value) => setDebouncedValue(value), delay),
    []
  );
  useEffect(() => {
    setDebounced(value);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
