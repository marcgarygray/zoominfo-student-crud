import { Link } from 'react-router-dom';

export function Welcome() {
  return (
    <>
      <h1>Welcome to the ZoomInfo demo app.</h1>
      <h2>
        This app demonstrates expertise in React, TypeScript, Node, Express,
        Prisma, and Jest.
      </h2>
      <Link to="/students">Click here</Link> to view the student list!
    </>
  );
}
