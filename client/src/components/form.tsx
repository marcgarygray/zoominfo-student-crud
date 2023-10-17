import styled, { css } from 'styled-components';
import { useTheme, Theme } from '../hooks/use-theme';
import { DetailedHTMLProps, FormHTMLAttributes } from 'react';
import { colors } from '../constants';

export function Form(
  props: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
) {
  const { theme } = useTheme();
  return <StyledForm $theme={theme} {...props} />;
}

export const StyledForm = styled.form<{ $theme: Theme }>`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    > label {
      width: 100px;
      text-align: right;
    }
  }
  > fieldset {
    width: 308px; // label is 100 pixels, input is 200 pixels, gap is 8 pixels: 200 + 100 + 8
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    border-width: 1px;
    border-style: solid;
    border-color: ${colors.black};
    border-radius: 4px;
    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 8px;
    }
  }
  ${({ $theme }) =>
    $theme === Theme.dark &&
    css`
      > fieldset {
        border-color: ${colors.white};
      }
    `}
`;
