import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from '../components/page';
import { get, post, update } from '../utils';
import { Button } from '../components/button';

export function Student() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [fetching, setFetching] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const isNewStudent = id === 'new';

  /**
   * Future improvement:
   * The button should be disabled if it's an update of a current resource
   * but no fields have been edited (form should be dirty).
   * Tracking the dirty state is outside of the scope of this effort
   * and can be handled by a library (React Hook Form, for instance)
   */
  const disableButton = useMemo(() => {
    return firstName === '' || lastName === '' || age === '' || fetching;
  }, [age, fetching, firstName, lastName]);

  useEffect(() => {
    const idNumber = Number(id);
    if (Number.isNaN(idNumber)) {
      return;
    }

    const fetchStudentData = async () => {
      const response = await get(`/student/${idNumber}`);
      const responseBody = await response.json();
      setFirstName(responseBody.firstName);
      setLastName(responseBody.lastName);
      setAge(responseBody.age);
    };

    void fetchStudentData();
  }, [id]);

  const createOrUpdateStudent = async () => {
    setFetching(true);
    try {
      if (isNewStudent) {
        await post({
          url: '/student',
          body: {
            firstName,
            lastName,
            age: Number(age),
          },
        });
      } else {
        await update({
          student: {
            firstName,
            lastName,
            age: Number(age),
            id: Number(id),
          },
        });
      }
      // this might not be the best UX - perhaps a success toast instead?
      // out of scope for this effort
      navigate('/students');
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Page>
      <h1>{isNewStudent ? 'Create' : 'Update'} Student</h1>
      <Button onClick={() => navigate('/students')}>&lt; Back</Button>
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
        <Button
          type="button"
          disabled={disableButton}
          onClick={createOrUpdateStudent}
        >
          {isNewStudent ? 'Create' : 'Update'}
        </Button>
      </form>
    </Page>
  );
}
