import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '../components/page';
import { post } from '../utils';

export function Student() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const { id } = useParams();

  const createStudent = async () => {
    try {
      const response = await post({
        url: '/student',
        body: {
          firstName,
          lastName,
          age: Number(age),
        },
      });
      console.log(response);
    } catch {}
  };
  return (
    <Page>
      <form>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="button" onClick={createStudent}>
          Create
        </button>
      </form>
    </Page>
  );
}
