import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/students');
      const responseBody = await response.json();
      console.log(responseBody);
    };
    void fetchData();
    const createStudent = async () => {
      const response = await fetch('/student', {
        method: 'POST',
        body: JSON.stringify({
          firstName: 'Marcus',
          lastName: 'Aurelius',
          age: 45,
          classIds: [1],
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
    };
    void createStudent();
  });
  return <p>hi!</p>;
}

export default App;
