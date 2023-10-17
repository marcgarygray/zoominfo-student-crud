/**
 * Future improvement:
 * Use a modern HTTP library such as axios
 */

import { Student } from './hooks/use-students-data';
import { SortModel } from './pages/students';

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
  return students.filter((student) => {
    let exclude = false;
    if (classFilter !== 0) {
      exclude =
        student.classes.find((_class) => _class.id === classFilter) ===
        undefined;
    }
    // we only need to keep checking if we aren't already excluding the record
    if (!exclude && searchString !== '') {
      const match =
        student.firstName.includes(searchString) ||
        student.lastName.includes(searchString);
      exclude = !match;
    }
    return !exclude;
  });
}
