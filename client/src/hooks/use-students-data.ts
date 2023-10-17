import { useEffect, useMemo, useState } from 'react';
import { get } from '../utils';
export type Class = {
  id: number;
  name: string;
};

export type Student = {
  age: number;
  classes: Class[];
  createdAt: string; // Datetime
  firstName: string;
  lastName: string;
  id: number;
};

/**
 * Future improvement
 * Utilize React Query to get loading/error states, caching, and other features
 */
export function useStudentsData() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await get('/students');
        const responseBody = await response.json();
        setStudents(responseBody);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    void fetchStudents();
  }, [setLoading]);
  const memoizedValue = useMemo(
    () => ({
      loading,
      students,
    }),
    [loading, students]
  );
  return memoizedValue;
}
