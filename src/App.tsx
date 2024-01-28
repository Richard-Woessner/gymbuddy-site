import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './features/home/Home';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
