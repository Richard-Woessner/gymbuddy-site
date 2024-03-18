import React, { useMemo, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './WorkoutTable.scss';
import { useFireStore } from '../../providers/FireStoreProvider';
import { useAuth } from '../../providers/AuthProvider';
import { Log } from '../../models/Logs';
import { UserData } from '../../models/User';

type WorkoutData = {
  workoutName: string;
  weights: string;
  sets: number;
  reps: number;
  completed: boolean;
};

const WorkoutTable = () => {
  const {
    currentClientUid,
    setCurrentClientUid,
    getLogs,
    clientLogs,
    clients,
  } = useFireStore();
  const { user } = useAuth();

  const [tableData, setTableData] = useState<WorkoutData[]>([]);

  const currentClient: UserData | undefined = clients?.find(
    (x) => x.uid === currentClientUid,
  );

  useMemo(() => {
    const clientLog = clientLogs?.find((c) => c.clientUid === currentClientUid)
      ?.Logs as Log[];

    const tempTableData: WorkoutData[] = [];

    if (clientLog === undefined) return;

    console.log(clientLog);

    clientLog.forEach((log: Log) => {
      log.exercises.forEach((exercise) => {
        console.log(exercise);

        tempTableData.push({
          workoutName: exercise.exerciseName,
          weights: `${exercise.totalWeight} lbs`,
          sets: exercise.sets.length,
          reps: exercise.sets[0].reps,
          completed: exercise.sets.every((set) => set.completed),
        });
      }); // Add closing parenthesis here
    });

    setTableData(tempTableData);
  }, [clientLogs, currentClientUid]);

  useMemo(() => {
    if (clientLogs === null) return;

    if (user?.trainerData?.clients === undefined) return;

    getLogs(user?.trainerData?.clients ?? []);
  }, [user]);

  if (!clientLogs || !currentClientUid || !tableData || !currentClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className={'workout-container'}>
      <div className={'center-heading'}>
        <h2>{`${currentClient.name}'s Workout Logs`}</h2>
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
            {tableData.map((row: any, index: any) => (
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
