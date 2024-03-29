import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Students } from './pages/students';
import { Student } from './pages/student';
import { NotFound } from './pages/not-found';
import { Welcome } from './pages/welcome';
import { ThemeProvider } from './hooks/use-theme';
import { ThemeToggle } from './components/theme-toggle';
import { routes } from './constants';

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <BrowserRouter>
        <Routes>
          <Route index element={<Welcome />} />
          <Route path={routes.students} element={<Students />} />
          <Route path={`${routes.student}/:id`} element={<Student />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
