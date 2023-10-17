import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from '../components/page';
import { get, post, update } from '../utils';
import { Button } from '../components/button';
import { Class, useClassesData } from '../hooks/use-classes-data';

export function Student() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<
    Record<number, boolean>
  >({});
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
      const selectionModel: Record<number, boolean> = {};
      responseBody.classes.forEach((singleClass: Class) => {
        selectionModel[singleClass.id] = true;
      });
      setSelectedClasses(selectionModel);
    };

    void fetchStudentData();
  }, [id]);

  /**
   * Future improvement
   * Put this into a context so we can share a single data fetch among components.
   * Alternately, using a fetching library like RQ will simple get the data from the cache
   * and prevent us from needing to use a context
   */
  const { classes, loading } = useClassesData();

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
            classIds: Object.keys(selectedClasses).map((key) => Number(key)),
          },
        });
      } else {
        await update({
          student: {
            firstName,
            lastName,
            age: Number(age),
            classIds: Object.keys(selectedClasses).map((key) => Number(key)),
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

  const handleClassSelection: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const newSelection = { ...selectedClasses };
    if (newSelection[Number(e.target.value)]) {
      delete newSelection[Number(e.target.value)];
    } else {
      newSelection[Number(e.target.value)] = true;
    }
    setSelectedClasses(newSelection);
  };

  return (
    <Page>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <h1>{isNewStudent ? 'Create' : 'Update'} Student</h1>
          <Button onClick={() => navigate('/students')}>&lt; Back</Button>
          <form>
            <div>
              <label htmlFor="firstName">First name:</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last name:</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <fieldset>
              <legend>Classes:</legend>
              {classes.map((singleClass) => (
                <div key={singleClass.id}>
                  <input
                    id={singleClass.name}
                    type="checkbox"
                    value={singleClass.id}
                    checked={selectedClasses[singleClass.id] !== undefined}
                    onChange={handleClassSelection}
                  />
                  <label htmlFor={singleClass.name}>{singleClass.name}</label>
                </div>
              ))}
            </fieldset>
            <Button
              type="button"
              disabled={disableButton}
              onClick={createOrUpdateStudent}
            >
              {isNewStudent ? 'Create' : 'Update'}
            </Button>
          </form>
        </>
      )}
    </Page>
  );
}
