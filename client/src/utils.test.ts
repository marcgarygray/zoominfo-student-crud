import { SortDirection, SortableColumn, Student } from './types';
import { getSortedAndFilteredStudents } from './utils';

const mockStudents: Student[] = [
  {
    firstName: 'Marc',
    lastName: 'Gray',
    age: 40,
    id: 1,
    classes: [],
    createdAt: new Date().toUTCString(),
  },
  {
    firstName: 'Bilbo',
    lastName: 'Baggins',
    age: 111,
    id: 2,
    classes: [{ id: 4, name: 'English Literature' }],
    createdAt: new Date().toUTCString(),
  },
  {
    firstName: 'Gimli',
    lastName: 'Durin',
    age: 262,
    id: 3,
    classes: [{ id: 3, name: 'Mining' }],
    createdAt: new Date().toUTCString(),
  },
];

describe('utility function for sorting and filtering students', () => {
  describe('Class filter', () => {
    test('Providing no class filter (-1) returns all students', () => {
      const filteredStudents = getSortedAndFilteredStudents({
        classFilter: -1,
        searchString: '',
        sortModel: {
          column: SortableColumn.Age,
          direction: SortDirection.ASC,
        },
        students: mockStudents,
      });
      expect(filteredStudents).toEqual(mockStudents);
    });
    test('Providing a class filter for "no classes" (0) returns only students with no classes', () => {
      const filteredStudents = getSortedAndFilteredStudents({
        classFilter: 0,
        searchString: '',
        sortModel: {
          column: SortableColumn.Age,
          direction: SortDirection.ASC,
        },
        students: mockStudents,
      });
      expect(filteredStudents).toEqual([mockStudents[0]]);
    });
    test('Filtering for a class by id returns only students enrolled in that class', () => {
      const filteredStudents = getSortedAndFilteredStudents({
        classFilter: 4,
        searchString: '',
        sortModel: {
          column: SortableColumn.Age,
          direction: SortDirection.ASC,
        },
        students: mockStudents,
      });
      expect(filteredStudents).toEqual([mockStudents[1]]);
    });
  });
  describe('Search string', () => {
    test('Empty search string does not filter', () => {
      const filteredStudents = getSortedAndFilteredStudents({
        classFilter: -1,
        searchString: '',
        sortModel: {
          column: SortableColumn.Age,
          direction: SortDirection.ASC,
        },
        students: mockStudents,
      });
      expect(filteredStudents).toEqual(mockStudents);
    });
    test('Providing a search string performs a correct case-insensitive filter searching name fields', () => {
      const filteredStudents = getSortedAndFilteredStudents({
        classFilter: -1,
        searchString: 'gImLi',
        sortModel: {
          column: SortableColumn.Age,
          direction: SortDirection.ASC,
        },
        students: mockStudents,
      });
      expect(filteredStudents).toEqual([mockStudents[2]]);
    });
    test('A search string that matches no records returns an empty array', () => {
      const filteredStudents = getSortedAndFilteredStudents({
        classFilter: -1,
        searchString: 'YouShallNotPass',
        sortModel: {
          column: SortableColumn.Age,
          direction: SortDirection.ASC,
        },
        students: mockStudents,
      });
      expect(filteredStudents).toEqual([]);
    });
  });
  describe('sorting', () => {
    test.todo('Sort models work appropriately');
  });
});
