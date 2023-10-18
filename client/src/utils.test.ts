import { Student } from './types';
import { getSortedAndFilteredStudents } from './utils';

const mockStudents: Student[] = [
  {
    firstName: 'Marc',
    lastName: 'Gray',
    age: 40,
    id: 1,
    classes: [],
    createdAt: new Date().toDateString(),
  },
];

describe('utility function for sorting and filtering students', () => {
  test('Class filter', () => {
    //
  });
});
