import { Link } from 'react-router-dom';
import { Page } from '../components/page';

export function NotFound() {
  return (
    <Page>
      <h1>Page not found</h1>
      <p>
        You seem to have navigated to an unknown page.{' '}
        <Link to="/students">Click here</Link> to view the list of students.
      </p>
    </Page>
  );
}
