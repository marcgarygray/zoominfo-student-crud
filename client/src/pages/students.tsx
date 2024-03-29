import React, { useMemo, useState } from 'react';
import { Page } from '../components/page';
import {
  deleteMultipleStudents,
  deleteSingleStudent,
  formatDate,
  getSortedAndFilteredStudents,
} from '../utils';
import { ListHeader } from '../components/student-list-page-header';
import { Button } from '../components/button';
import { useNavigate } from 'react-router-dom';
import { TableFilters } from '../components/table-filters';
import {
  ButtonCell,
  SortableColumnHeader,
  Table,
} from '../components/table-components';
import { routes } from '../constants';
import {
  SelectionModel,
  SortableColumn,
  SortDirection,
  SortModel,
} from '../types';
import { useStudentListPageData } from '../hooks/use-student-list-page-data';

export function Students() {
  const navigate = useNavigate();

  // selection, sort, and filter states
  const [selectedStudents, setSelectedStudents] = useState<SelectionModel>({});
  const [sortModel, setSortModel] = useState<SortModel>({
    column: SortableColumn.LastName,
    direction: SortDirection.ASC,
  });
  const [classFilter, setClassFilter] = useState(-1);
  const [searchString, setSearchString] = useState('');

  // data
  const { loading, classes, students, refetch } = useStudentListPageData();

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

  // prevent users with slow connections from clicking buttons while a resource is being deleted
  const [deleting, setDeleting] = useState(0);
  // Future improvement - destructive actions should have a confirmation modal or similar
  const onSingleDeleteClick = async (id: number) => {
    setDeleting(id);
    try {
      await deleteSingleStudent(id);
      refetch();
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(0);
    }
  };

  // prevent users with slow connections from clicking buttons while resources are being deleted
  const [bulkDeleting, setBulkDeleting] = useState(false);
  // Future improvement - destructive actions should have a confirmation modal or similar
  const onBulkDeleteClick = async () => {
    setBulkDeleting(true);
    try {
      await deleteMultipleStudents(
        Object.keys(selectedStudents).map((key) => Number(key))
      );
      refetch();
    } catch (e) {
      console.error(e);
    } finally {
      setBulkDeleting(false);
    }
  };

  const onSelectAllClick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
      const newSelectionModel: SelectionModel = Object.fromEntries(
        students.map((student) => [student.id, true])
      );
      setSelectedStudents(newSelectionModel);
    } else {
      setSelectedStudents({});
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
        disableAddButton={bulkDeleting}
        disableBulkDeleteButton={
          bulkDeleting || loading || Object.keys(selectedStudents).length === 0
        }
        onAddStudentClick={() => navigate(`${routes.student}/new`)}
        onBulkDeleteClick={onBulkDeleteClick}
      />
      {loading && 'Loading...'}
      {!loading && (
        <>
          <TableFilters
            classes={classes}
            onClassFilterChange={(e) => setClassFilter(Number(e.target.value))}
            onSearchInputChange={(value) => setSearchString(value)}
          />
          {sortedAndFilteredStudents.length === 0 && (
            <p>No data matches the provided filters or no students exist.</p>
          )}
          {/**
           *  Future improvement: use a table library
           *  This implementation is tightly coupled to the data model
           *  and does not support server pagination/sorting/filtering.
           *  Out of scope for this effort.
           */}
          {sortedAndFilteredStudents.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      checked={
                        Object.keys(selectedStudents).length === students.length
                      }
                      onChange={onSelectAllClick}
                    />
                  </td>
                  <td>ID</td>
                  <td>First Name</td>
                  <SortableColumnHeader
                    $sortDirection={
                      sortModel.column === SortableColumn.LastName
                        ? sortModel.direction
                        : undefined
                    }
                    onClick={() => onSortClick(SortableColumn.LastName)}
                  >
                    Last Name
                  </SortableColumnHeader>
                  <td>Classes</td>
                  <SortableColumnHeader
                    $sortDirection={
                      sortModel.column === SortableColumn.Age
                        ? sortModel.direction
                        : undefined
                    }
                    onClick={() => onSortClick(SortableColumn.Age)}
                  >
                    Age
                  </SortableColumnHeader>
                  <SortableColumnHeader
                    $sortDirection={
                      sortModel.column === SortableColumn.DateAdded
                        ? sortModel.direction
                        : undefined
                    }
                    onClick={() => onSortClick(SortableColumn.DateAdded)}
                  >
                    Date Added
                  </SortableColumnHeader>
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
                    <ButtonCell>
                      <Button
                        disabled={student.id === deleting}
                        onClick={() =>
                          navigate(`${routes.student}/${student.id}`)
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        disabled={student.id === deleting}
                        onClick={() => onSingleDeleteClick(student.id)}
                      >
                        Delete
                      </Button>
                    </ButtonCell>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </Page>
  );
}
