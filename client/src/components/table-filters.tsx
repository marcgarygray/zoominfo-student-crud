import { useState } from 'react';
import styled, { css } from 'styled-components';
import { Class } from '../types';
import { Theme, useTheme } from '../hooks/use-theme';
import { colors } from '../constants';
import { Input } from './input';

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
          <option value="-1">No filter applied</option>
          <option value="0">No classes</option>
          {classes.map((_class) => (
            <option key={_class.id} value={_class.id}>
              {_class.name}
            </option>
          ))}
        </Select>
      </div>
      <Input
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
      color: ${colors.white};
    `}
`;
