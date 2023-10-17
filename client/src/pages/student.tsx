import { useParams } from 'react-router-dom';
import { Page } from '../components/page';

export function Student() {
  const { id } = useParams();
  return (
    <Page>
      <p>{id}</p>
    </Page>
  );
}
