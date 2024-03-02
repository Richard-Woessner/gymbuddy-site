// Your component file

import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './WorkoutTable.scss';

function createData(
  workoutName: string,
  weights: string,
  sets: number,
  reps: number,
  completed: boolean,
) {
  return { workoutName, weights, sets, reps, completed };
}

const rows = [
  createData('Bench Press', '150 lbs', 3, 10, true),
  createData('Squats', '200 lbs', 4, 8, false),
  createData('Deadlifts', '180 lbs', 3, 12, true),
  // Add more rows as needed
];

export default function WorkoutTable() {
  return (
    <div className="workout-container">
      <div className="center-heading">
        <h2>Trainees Workout Logs</h2>
      </div>
      <TableContainer component={Paper}>
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
            {rows.map((row) => (
              <TableRow key={row.workoutName}>
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
}
