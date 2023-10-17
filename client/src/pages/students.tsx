import { Page } from '../components/page';
import { useStudentsData } from '../hooks/use-students-data';

export function Students() {
  const { students, loading } = useStudentsData();
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
