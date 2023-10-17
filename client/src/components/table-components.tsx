import styled, { css } from 'styled-components';
import { Theme, useTheme } from '../hooks/use-theme';
import { SortDirection } from '../pages/students';
import { colors } from '../constants';

export const ButtonCell = styled.td`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

type TableProps = {
  children: React.ReactNode;
};

export function Table({ children }: TableProps) {
  const { theme } = useTheme();
  return <StyledTable $theme={theme}>{children}</StyledTable>;
}

const StyledTable = styled.table<{
  $theme: Theme;
}>`
  font-size: 12px;
  border: 1px solid black;
  border-spacing: 0;
  border-collapse: collapse;
  td {
    padding: 8px;
  }
  thead {
    border-bottom: 2px solid black;
  }
  thead td {
    font-weight: bold;
  }
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  ${({ $theme }) =>
    $theme === Theme.dark &&
    css`
      border-color: ${colors.white};
      thead,
      td {
        border-color: ${colors.white};
      }
    `}
`;

export const SortableColumnHeader = styled.td<{
  $sortDirection?: SortDirection;
}>`
  position: relative;
  padding-right: 48px !important;
  cursor: pointer;
  ${({ $sortDirection }) =>
    $sortDirection !== undefined &&
    css`
      &::after {
        content: '^';
        position: absolute;
        right: 8px;
        top: 9px;
        ${$sortDirection === SortDirection.DESC &&
        css`
          transform: rotateX(180deg);
          top: 5px;
        `}
      }
    `}
`;
