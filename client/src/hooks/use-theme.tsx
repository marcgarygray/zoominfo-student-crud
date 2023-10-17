import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export enum Theme {
  light,
  dark,
}

const ThemeContext = createContext({
  theme: Theme.light,
  onToggle: () => {},
});

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(Theme.light);

  const onToggle = useCallback(() => {
    if (theme === Theme.light) {
      setTheme(Theme.dark);
    } else {
      setTheme(Theme.light);
    }
  }, [theme]);

  const memoizedValue = useMemo(
    () => ({
      theme,
      onToggle,
    }),
    [theme, onToggle]
  );

  return (
    <ThemeContext.Provider value={memoizedValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
