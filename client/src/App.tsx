import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Students } from './pages/students';
import { Student } from './pages/student';
import { NotFound } from './pages/not-found';
import { Welcome } from './pages/welcome';

function App() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('/students');
  //     const responseBody = await response.json();
  //     console.log(responseBody);
  //   };
  //   void fetchData();
  //   const createStudent = async () => {
  //     const response = await fetch('/student', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         firstName: 'Marcus',
  //         lastName: 'Aurelius',
  //         age: 45,
  //         classIds: [1],
  //       }),
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  //     console.log(response);
  //   };
  //   void createStudent();
  // });
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Welcome />} />
        <Route path="/students" element={<Students />} />
        <Route path="/student/:id" element={<Student />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
