import { useState } from 'react';
import styled, { css } from 'styled-components';
import { Class } from '../hooks/use-classes-data';
import { Theme, useTheme } from '../hooks/use-theme';

type TableFiltersProps = {
  classes: Class[];
  onClassFilterChange: React.ChangeEventHandler<HTMLSelectElement>;
  onSearchInputChange: (value: string) => void;
};

export function TableFilters({
  classes,
  onClassFilterChange,
  onSearchInputChange,
}: TableFiltersProps) {
  const [search, setSearch] = useState('');

  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
    onSearchInputChange(e.target.value);
  };
  const { theme } = useTheme();
  return (
    <Row>
      <div>
        <Label>Filter by class:</Label>
        <Select $theme={theme} onChange={onClassFilterChange}>
          <option value="0">None</option>
          {classes.map((_class) => (
            <option key={_class.id} value={_class.id}>
              {_class.name}
            </option>
          ))}
        </Select>
      </div>
      <Input
        $theme={theme}
        type="text"
        placeholder="Search students by name..."
        value={search}
        onChange={onSearchChange}
      />
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  margin-bottom: 24px;
`;

const Label = styled.label`
  margin-right: 8px;
`;

const Select = styled.select<{ $theme: Theme }>`
  border-radius: 4px;
  padding: 6px;
  background: transparent;
  ${({ $theme }) =>
    $theme === Theme.dark &&
    css`
      color: white;
    `}
`;

const Input = styled.input<{ $theme: Theme }>`
  width: 200px;
  border-radius: 4px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid black;
  ${({ $theme }) =>
    $theme === Theme.dark &&
    css`
      color: white;
      border-color: white;
    `}
`;
