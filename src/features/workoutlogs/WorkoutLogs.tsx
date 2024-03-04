import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './WorkoutTable.scss';

type WorkoutData = {
  [key: string]: Array<{
    workoutName: string;
    weights: string;
    sets: number;
    reps: number;
    completed: boolean;
  }>;
};

const workoutData: WorkoutData = {
  'Trainee 1': [
    {
      workoutName: 'Bench Press',
      weights: '180 lbs',
      sets: 4,
      reps: 10,
      completed: true,
    },
    {
      workoutName: 'Squats',
      weights: '245 lbs',
      sets: 5,
      reps: 6,
      completed: false,
    },
    {
      workoutName: 'Deadlifts',
      weights: '220 lbs',
      sets: 4,
      reps: 8,
      completed: true,
    },
    // Add more workouts for Trainee 1
  ],
  'Trainee 2': [
    {
      workoutName: 'Leg Press',
      weights: '160 lbs',
      sets: 3,
      reps: 12,
      completed: false,
    },
    {
      workoutName: 'Sumo Deadlifts',
      weights: '220 lbs',
      sets: 4,
      reps: 8,
      completed: true,
    },
    {
      workoutName: 'Bent-over row',
      weights: '200 lbs',
      sets: 3,
      reps: 10,
      completed: true,
    },
    {
      workoutName: 'Bench',
      weights: '180 lbs',
      sets: 4,
      reps: 10,
      completed: true,
    },
    {
      workoutName: 'Bicep Curl',
      weights: '45 lbs',
      sets: 4,
      reps: 8,
      completed: true,
    },
    // Add more workouts for Trainee 2
  ],
  // Add more trainees as needed
};
const trainees = Object.keys(workoutData);

const WorkoutTable = () => {
  const [selectedTrainee, setSelectedTrainee] = useState(trainees[0]);

  const handleTraineeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTrainee(event.target.value);
  };

  return (
    <div className={'workout-container'}>
      <div className={'trainee-selector'}>
        <h2>Select Trainee:</h2>
        <select value={selectedTrainee} onChange={handleTraineeChange}>
          {trainees.map((trainee) => (
            <option key={trainee} value={trainee}>
              {trainee}
            </option>
          ))}
        </select>
      </div>
      <div className={'center-heading'}>
        <h2>{`${selectedTrainee}'s Workout Logs`}</h2>
      </div>
      <TableContainer component={Paper} className={'custom-table-container'}>
        <Table sx={{ minWidth: 650 }} aria-label="workout table">
          <TableHead>
            <TableRow>
              <TableCell>Workout Name</TableCell>
              <TableCell align="right">Weights</TableCell>
              <TableCell align="right">Sets</TableCell>
              <TableCell align="right">Reps</TableCell>
              <TableCell align="right">Completed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workoutData[selectedTrainee].map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.workoutName}
                </TableCell>
                <TableCell align="right">{row.weights}</TableCell>
                <TableCell align="right">{row.sets}</TableCell>
                <TableCell align="right">{row.reps}</TableCell>
                <TableCell align="right">
                  {row.completed ? 'Yes' : 'No'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WorkoutTable;
