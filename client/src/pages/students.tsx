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
        <table>
          <thead>
            <tr>
              <td></td>
              <td>ID</td>
              <td>First Name</td>
              <td>Last Name</td>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>checkbox here</td>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Page>
  );
}
