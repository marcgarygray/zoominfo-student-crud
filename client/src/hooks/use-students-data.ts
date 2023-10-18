import { useEffect, useMemo, useState, useRef } from 'react';
import { get } from '../utils';
import type { Class } from './use-classes-data';
import { routes } from '../constants';

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
export function useStudentsData({ refetch }: { refetch?: boolean }) {
  const hasFetched = useRef(false);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    try {
      const response = await get(routes.students);
      const responseBody = await response.json();
      setStudents(responseBody);
      hasFetched.current = true;
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current || refetch) {
      void fetchStudents();
    }
  }, [hasFetched, refetch]);

  return useMemo(
    () => ({
      loading,
      students,
    }),
    [loading, students]
  );
}
