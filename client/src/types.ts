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

export type Class = {
  id: number;
  name: string;
};
