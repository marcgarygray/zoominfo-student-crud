import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { Theme, useTheme } from '../hooks/use-theme';
import styled, { css } from 'styled-components';
import { colors } from '../constants';

export function Input(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  const { theme } = useTheme();
  return <StyledInput {...props} $theme={theme}></StyledInput>;
}

const StyledInput = styled.input<{ $theme: Theme }>`
  width: 200px;
  border-radius: 4px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid ${colors.black};
  ${({ $theme }) =>
    $theme === Theme.dark &&
    css`
      color: ${colors.white};
      border-color: ${colors.white};
    `};
`;
