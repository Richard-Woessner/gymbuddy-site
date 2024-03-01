import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './features/home/Home';
import NavBar from './components/NavBar';
import Test from './features/test/Test';
import MyWorkout from './features/myworkouts/MyWorkout';
import Workoutlogs from './features/workoutlogs/WorkoutLogs';

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/myworkout" element={<MyWorkout />} />
        <Route path="/workoutlogs" element={<Workoutlogs />} />
      </Routes>
    </>
  );
}

export enum RoutesEnum {
  HOME = '/',
  TEST = '/test',
  MY_WORKOUT = '/myworkout',
  WORKOUTLOGS = '/workoutlogs',
}

export default App;
