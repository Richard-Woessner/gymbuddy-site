import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './features/home/Home';
import NavBar from './components/NavBar';
import Test from './features/test/Test';
import MyWorkout from './features/myworkouts/MyWorkout';

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/myworkout" element={<MyWorkout />} />
      </Routes>
    </>
  );
}

export enum RoutesEnum {
  HOME = '/',
  TEST = '/test',
  MY_WORKOUT = '/myworkout',
}

export default App;
