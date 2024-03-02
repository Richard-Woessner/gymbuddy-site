import React from 'react';
import './App.css';
import { Routes, Route, useRoutes } from 'react-router-dom';
import Home from './features/home/Home';
import NavBar from './components/NavBar';
import Test from './features/test/Test';
import MyWorkout from './features/myworkouts/MyWorkout';
import Workoutlogs from './features/workoutlogs/WorkoutLogs';
import Login from './components/auth/login/login/Login';
import Register from './components/auth/register/Register';

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myworkout" element={<MyWorkout />} />
        <Route path="/workoutlogs" element={<Workoutlogs />} />
      </Routes>
    </>
  );
}

export enum RoutesEnum {
  HOME = '/',
  TEST = '/test',
  LOGIN = '/login',
  MY_WORKOUT = '/myworkout',
  WORKOUTLOGS = '/workoutlogs',
  REGISTER = '/register',
}

export default App;
