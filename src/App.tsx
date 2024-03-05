import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './features/home/Home';
import NavBar from './components/NavBar';
import Test from './features/test/Test';
import MyWorkout from './features/myworkouts/MyWorkout';
import Workoutlogs from './features/workoutlogs/WorkoutLogs';
import TraineesP from './features/traineesPage/TraineesP';
import Trainee1 from './features/traineesPage/Trainee1';
import Trainee2 from './features/traineesPage/Trainee2';
import Trainee3 from './features/traineesPage/Trainee3';
import Trainee4 from './features/traineesPage/Trainee4';
import Trainee5 from './features/traineesPage/Trainee5';
import Trainee6 from './features/traineesPage/Trainee6';

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/myworkout" element={<MyWorkout />} />
        <Route path="/workoutlogs" element={<Workoutlogs />} />
        <Route path="/traineesPage" element={<TraineesP />} />
        <Route path="/trainee1" element={<Trainee1 />} />
        <Route path="/trainee2" element={<Trainee2 />} />
        <Route path="/trainee3" element={<Trainee3 />} />
        <Route path="/trainee4" element={<Trainee4 />} />
        <Route path="/trainee5" element={<Trainee5 />} />
        <Route path="/trainee6" element={<Trainee6 />} />
      </Routes>
    </>
  );
}

export enum RoutesEnum {
  HOME = '/',
  TEST = '/test',
  MY_WORKOUT = '/myworkout',
  WORKOUTLOGS = '/workoutlogs',
  TRAINEES_PAGE = '/traineesPage',
  TRAINEE1 = '/trainee1',
  TRAINEE2 = '/trainee2',
  TRAINEE3 = '/trainee3',
  TRAINEE4 = '/trainee4',
  TRAINEE5 = '/trainee5',
  TRAINEE6 = '/trainee6',
}

export default App;
