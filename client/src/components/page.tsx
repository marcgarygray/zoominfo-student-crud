import styled, { css } from 'styled-components';
import { Theme, useTheme } from '../hooks/use-theme';
import { colors } from '../constants';
type PageProps = {
  children: React.ReactNode;
};

export function Page({ children }: PageProps) {
  const { theme } = useTheme();
  return <StyledPage $theme={theme}>{children}</StyledPage>;
}

const StyledPage = styled.div<{ $theme: Theme }>`
  padding: 48px 24px;
  background: ${colors.white};
  color: ${colors.black};
  box-sizing: border-box;
  height: 100vh;

  a {
    text-decoration: none;
  }

  ${({ $theme }) =>
    $theme === Theme.dark &&
    css`
      background: ${colors.nearlyBlack};
      color: ${colors.white};

      a {
        color: ${colors.cornflower};
        &:visited {
          color: ${colors.lavender};
        }
      }
    `}
`;
