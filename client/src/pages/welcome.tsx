import { Link } from 'react-router-dom';
import { Page } from '../components/page';

export function Welcome() {
  return (
    <Page>
      <h1>Welcome to the ZoomInfo student demo app.</h1>
      <h2>
        This app demonstrates expertise in React, TypeScript, Node, Express,
        Prisma, and Jest.
      </h2>
      <Link to="/students">Click here</Link> to view the student list!
    </Page>
  );
}
