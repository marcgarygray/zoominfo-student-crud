import { useParams } from 'react-router-dom';

export function Student() {
  const { id } = useParams();
  return <p>{id}</p>;
}
