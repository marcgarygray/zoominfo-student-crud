import { Theme, useTheme } from '../hooks/use-theme';
import styled, { css } from 'styled-components';

export function ThemeToggle() {
  const { theme, onToggle } = useTheme();
  return (
    <Toggle $theme={theme} onClick={onToggle}>
      Enable {theme === Theme.dark ? 'Light' : 'Dark'} Mode
    </Toggle>
  );
}

const Toggle = styled.button<{ $theme: Theme }>`
  position: absolute;
  background: none;
  top: 12px;
  right: 12px;
  color: black;
  border: 1px solid black;
  border-radius: 4px;
  padding: 4px 8px;
  ${({ $theme }) =>
    $theme === Theme.dark &&
    css`
      color: white;
      border-color: white;
    `}
`;
