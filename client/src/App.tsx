import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

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
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
