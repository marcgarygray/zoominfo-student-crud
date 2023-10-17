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
  padding: 24px;
  background: white;
  color: black;
  box-sizing: border-box;
  height: 100vh;
  ${({ $theme }) =>
    $theme === Theme.dark &&
    css`
      background: ${colors.nearlyBlack};
      color: white;
      a {
        color: ${colors.cornflower};
        &:visited {
          color: ${colors.lavender};
        }
      }
    `}
`;
