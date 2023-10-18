export type SelectionModel = Record<number, boolean>;

export enum SortableColumn {
  Age,
  DateAdded,
  LastName,
}

export enum SortDirection {
  ASC,
  DESC,
}

export type SortModel = {
  column: SortableColumn;
  direction: SortDirection;
};

export type Student = {
  age: number;
  classes: Class[];
  createdAt: string; // Datetime
  firstName: string;
  lastName: string;
  id: number;
};

export type Class = {
  id: number;
  name: string;
};
