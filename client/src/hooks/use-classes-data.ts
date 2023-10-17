import { useEffect, useMemo, useState } from 'react';
import { get } from '../utils';
export type Class = {
  id: number;
  name: string;
};

/**
 * Future improvement
 * Utilize React Query to get loading/error states, caching, and other features
 */
export function useClassesData() {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<Class[]>([]);

  const fetchStudents = async () => {
    try {
      const response = await get('/classes');
      const responseBody = await response.json();
      setClasses(responseBody);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchStudents();
  }, []);

  return useMemo(
    () => ({
      classes,
      loading,
    }),
    [classes, loading]
  );
}
