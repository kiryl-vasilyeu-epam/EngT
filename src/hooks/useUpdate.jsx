import { useEffect, useState } from 'react';

export const useUpdate = (callback, dependency) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    } else {
      callback();
    }
  }, dependency);
};
