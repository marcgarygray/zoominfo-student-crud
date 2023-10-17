import { Theme, useTheme } from '../hooks/use-theme';
import styled from 'styled-components';
import { Button } from './button';

export function ThemeToggle() {
  const { theme, onToggle } = useTheme();
  return (
    <Toggle onClick={onToggle} type="button">
      Enable {theme === Theme.dark ? 'Light' : 'Dark'} Mode
    </Toggle>
  );
}

const Toggle = styled(Button)`
  position: absolute;
  top: 12px;
  right: 12px;
`;
