import { useMemo, useState } from 'react';
import { Page } from '../components/page';
import { useClassesData } from '../hooks/use-classes-data';
import { useStudentsData } from '../hooks/use-students-data';
import { formatDate, getSortedAndFilteredStudents } from '../utils';
import { ListHeader } from '../components/student-list-page-header';
import { Button } from '../components/button';
import { useNavigate } from 'react-router-dom';
import { TableFilters } from '../components/table-filters';

enum SortableColumn {
  Age,
  DateAdded,
  LastName,
}

enum SortDirection {
  ASC,
  DESC,
}

export type SortModel = {
  column: SortableColumn;
  direction: SortDirection;
};

export function Students() {
  const navigate = useNavigate();

  // selection, sort, and filter states
  const [selectedStudents, setSelectedStudents] = useState<
    Record<number, boolean>
  >({});
  const [sortModel, setSortModel] = useState<SortModel>({
    column: SortableColumn.LastName,
    direction: SortDirection.ASC,
  });
  const [classFilter, setClassFilter] = useState(0);
  const [searchString, setSearchString] = useState('');

  // data
  const { students, loading: studentsLoading } = useStudentsData();
  const { classes, loading: classesLoading } = useClassesData();

  const loading = useMemo(
    () => classesLoading || studentsLoading,
    [classesLoading, studentsLoading]
  );

  // handlers
  const onCheckboxClick = (id: number) => {
    const newSelection = { ...selectedStudents };
    if (selectedStudents[id]) {
      delete newSelection[id];
    } else {
      newSelection[id] = true;
    }
    setSelectedStudents(newSelection);
  };

  const onSortClick = (column: SortableColumn) => {
    // if the column clicked is already the sorted column, invert the direction
    if (sortModel.column === column) {
      if (sortModel.direction === SortDirection.ASC) {
        setSortModel({ ...sortModel, direction: SortDirection.DESC });
      } else {
        setSortModel({ ...sortModel, direction: SortDirection.ASC });
      }
    } else {
      // otherwise, sort by the new column, ascending
      setSortModel({ column, direction: SortDirection.ASC });
    }
  };

  const sortedAndFilteredStudents = useMemo(
    () =>
      getSortedAndFilteredStudents({
        classFilter,
        searchString,
        sortModel,
        students,
      }),
    [classFilter, searchString, sortModel, students]
  );

  return (
    <Page>
      <ListHeader
        tableLoading={loading}
        onAddStudentClick={() => navigate('/student/new')}
      />
      {loading ? (
        'Loading...'
      ) : (
        <>
          <TableFilters
            classes={classes}
            onClassFilterChange={(e) => setClassFilter(Number(e.target.value))}
            onSearchInputChange={(value) => setSearchString(value)}
          />
          <table>
            <thead>
              <tr>
                <td></td>
                <td>ID</td>
                <td>First Name</td>
                <td onClick={() => onSortClick(SortableColumn.LastName)}>
                  Last Name
                </td>
                <td>Classes</td>
                <td onClick={() => onSortClick(SortableColumn.Age)}>Age</td>
                <td onClick={() => onSortClick(SortableColumn.DateAdded)}>
                  Date Added
                </td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {sortedAndFilteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <input
                      checked={selectedStudents[student.id] || false}
                      type="checkbox"
                      value={student.id}
                      onChange={() => onCheckboxClick(student.id)}
                    />
                  </td>
                  <td>{student.id}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>
                    {student.classes
                      .map((singleClass) => singleClass.name)
                      .join(', ')}
                  </td>
                  <td>{student.age}</td>
                  <td>{formatDate(student.createdAt)}</td>
                  <td>
                    <Button onClick={() => navigate(`/student/${student.id}`)}>
                      Edit
                    </Button>
                    <Button>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </Page>
  );
}
