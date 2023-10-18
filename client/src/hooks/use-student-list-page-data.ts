import { useEffect, useMemo, useState } from 'react';
import { useStudentsData } from './use-students-data';
import { useClassesData } from './use-classes-data';

export function useStudentListPageData() {
  /**
   * Future improvement: Using a fetching library (React Query)
   * so we don't need to manually handle refetch logic and can use cache invalidation
   */
  const [refetch, setRefetch] = useState(false);
  const { students, loading: studentsLoading } = useStudentsData({
    refetch,
  });

  useEffect(() => {
    if (refetch) {
      setRefetch(false);
    }
  }, [refetch, setRefetch]);

  const { classes, loading: classesLoading } = useClassesData();

  const loading = useMemo(
    () => classesLoading || studentsLoading,
    [classesLoading, studentsLoading]
  );

  return useMemo(
    () => ({
      classes,
      loading,
      students,
      refetch: () => setRefetch(true),
    }),
    [classes, loading, students]
  );
}
