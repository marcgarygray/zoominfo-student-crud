import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import { Theme, useTheme } from '../hooks/use-theme';
import styled, { css } from 'styled-components';

export function Button(
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  const { theme } = useTheme();
  return <StyledButton {...props} $theme={theme}></StyledButton>;
}

const StyledButton = styled.button<{ $theme: Theme }>`
  background: none;
  color: black;
  border: 1px solid black;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  ${({ $theme }) =>
    $theme === Theme.dark &&
    css`
      color: white;
      border-color: white;
    `}
`;
