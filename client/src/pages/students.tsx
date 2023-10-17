import { useMemo } from 'react';
import { Page } from '../components/page';
import { useClassesData } from '../hooks/use-classes-data';
import { useStudentsData } from '../hooks/use-students-data';

export function Students() {
  const { students, loading: studentsLoading } = useStudentsData();
  const { classes, loading: classesLoading } = useClassesData();
  const loading = useMemo(
    () => classesLoading || studentsLoading,
    [classesLoading, studentsLoading]
  );
  console.log(classes);
  return (
    <Page>
      {loading ? (
        'Loading...'
      ) : (
        <ul>
          {students.map((student) => (
            <li>{student.firstName}</li>
          ))}
        </ul>
      )}
    </Page>
  );
}
