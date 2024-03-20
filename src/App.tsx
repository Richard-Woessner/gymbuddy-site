import React, { useMemo } from 'react';
import './App.css';
import { Routes, Route, redirect } from 'react-router-dom';
import Home from './features/home/Home';
import NavBar from './components/NavBar';
import Test from './features/test/Test';
import MyWorkout from './features/myworkouts/MyWorkout';
import Workoutlogs from './features/workoutlogs/WorkoutLogs';
import Auth from './features/auth/Auth';
import SignUp from './features/auth/signUp/SignUp';
import Messages from './features/messages/Messages';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <>
      <NavBar />
      <div className="contentWrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/myworkout" element={<MyWorkout />} />
          <Route path="/workoutlogs" element={<Workoutlogs />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
}

export enum RoutesEnum {
  HOME = '/',
  TEST = '/test',
  MY_WORKOUT = '/myworkout',
  WORKOUTLOGS = '/workoutlogs',
  AUTH = '/auth',
  SIGN_UP = '/sign-up',
  MESSAGES = '/messages',
}

export default App;
