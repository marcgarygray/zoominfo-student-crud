import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import { Theme, useTheme } from '../hooks/use-theme';
import styled, { css } from 'styled-components';
import { colors } from '../constants';

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
  transition: all 0.2s ease-in-out;
  &:disabled {
    cursor: not-allowed;
  }
  &:hover&:not(:disabled) {
    background: ${colors.white20};
  }
  ${({ $theme }) =>
    $theme === Theme.dark &&
    css`
      color: ${colors.white20};
      border-color: ${colors.white20};
      &:hover&:not(:disabled) {
        background: ${colors.nearlyBlack90};
        color: ${colors.white};
        border-color: ${colors.white};
      }
    `}
`;
