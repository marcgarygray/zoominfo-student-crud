import { useEffect, useMemo, useState } from 'react';
import { get } from '../utils';
import type { Class } from './use-classes-data';

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

  const fetchStudents = async () => {
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

  useEffect(() => {
    void fetchStudents();
  }, []);

  return useMemo(
    () => ({
      loading,
      students,
    }),
    [loading, students]
  );
}