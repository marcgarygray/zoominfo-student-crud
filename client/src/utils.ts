/**
 * Future improvement:
 * Use a modern HTTP library such as axios
 */

import { Student } from './hooks/use-students-data';
import { SortDirection, SortModel, SortableColumn } from './pages/students';

export function get(url: string) {
  return fetch(url);
}

export function post({
  url,
  body,
}: {
  url: string;
  body: Record<string, unknown>;
}) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
}

export function deleteSingleStudent(id: number) {
  return fetch(`/student/${id}`, {
    method: 'DELETE',
  });
}

export function deleteMultipleStudents(ids: number[]) {
  return fetch('/students', {
    method: 'DELETE',
    body: JSON.stringify({
      studentIds: ids,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Future improvement
 * Consider a datetime library if needs dictate (date-fns)
 */
export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('en-US').format(new Date(dateString));
}

type SortAndFilterFunctionArg = {
  classFilter: number;
  searchString: string;
  sortModel: SortModel;
  students: Student[];
};

export function getSortedAndFilteredStudents({
  classFilter,
  searchString,
  sortModel,
  students,
}: SortAndFilterFunctionArg) {
  return (
    students
      // filter first so we have to sort less items
      .filter((student) => {
        let exclude = false;
        if (classFilter !== 0) {
          exclude =
            student.classes.find((_class) => _class.id === classFilter) ===
            undefined;
        }
        // we only need to keep checking if we aren't already excluding the record
        if (!exclude && searchString !== '') {
          const match =
            student.firstName
              .toLocaleLowerCase()
              .includes(searchString.toLocaleLowerCase()) ||
            student.lastName
              .toLocaleLowerCase()
              .includes(searchString.toLocaleLowerCase());
          exclude = !match;
        }
        return !exclude;
      })
      .sort((a, b) => {
        switch (sortModel.column) {
          case SortableColumn.Age:
            const ageCompare = a.age - b.age;
            if (sortModel.direction === SortDirection.ASC) {
              return ageCompare;
            } else {
              return ageCompare * -1;
            }
          case SortableColumn.DateAdded:
            const firstDate = new Date(a.createdAt).valueOf();
            const secondDate = new Date(b.createdAt).valueOf();
            const dateCompare = firstDate - secondDate;
            if (sortModel.direction === SortDirection.ASC) {
              return dateCompare;
            } else {
              return dateCompare * -1;
            }
          case SortableColumn.LastName:
            const stringCompare = a.lastName
              .toLocaleLowerCase()
              .localeCompare(b.lastName.toLocaleLowerCase());
            if (sortModel.direction === SortDirection.ASC) {
              return stringCompare;
            } else {
              return stringCompare * -1;
            }
          default:
            return 0;
        }
      })
  );
}
