import React, { useState } from 'react';
import styles from './WorkoutBuilder.module.scss';
import { Button, Container, Grid, Paper, TextField } from '@mui/material';
import MaxPaper from '../MaxPaper/MaxPaper';
import { Workout } from '../../models/Workout';
import { generateRandomString } from '../../helpers/Func';
import { ExerciseBuilder } from './WorkoutBuilderComponents';
import { UserData } from '../../models/User';

interface WorkoutBuilderProps {
  client: UserData;
}

const WorkoutBuilder: React.FC<WorkoutBuilderProps> = (
  props: WorkoutBuilderProps,
) => {
  const client = props.client;
  const [workout, setWorkout] = useState<Workout>({
    Name: '',
    Exercises: [],
    Id: generateRandomString(9),
  });

  const setName = (name: string) => {
    setWorkout((prev) => {
      return { ...prev, Name: name };
    });
  };

  const addExercise = () => {
    setWorkout((prev) => {
      return {
        ...prev,
        Exercises: [
          ...prev.Exercises,
          {
            Id: generateRandomString(9),
            Exercise: '',
            Sets: [],
            Type: '',
          },
        ],
      };
    });
  };

  return (
    <MaxPaper elevation={4} className={styles.maxPaper}>
      <Grid container spacing={2} padding={2}>
        <Grid container xs={12} justifyContent={'space-between'}>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Workout Name"
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item alignSelf={'self-end'}>
            <Button variant={'outlined'} onClick={addExercise} size="small">
              Add Exercise
            </Button>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item>
            <h3>Exercises</h3>
          </Grid>
          {workout.Exercises.map((exercise) => {
            return (
              <ExerciseBuilder
                key={exercise.Id}
                exercise={exercise}
                workout={workout}
                setWorkout={setWorkout}
                client={client}
              />
            );
          })}
        </Grid>
      </Grid>
    </MaxPaper>
  );
};

export default WorkoutBuilder;

// export interface Workout {
//   Name: string;
//   Id: string;
//   Exercises: Exercise[];
//   uid?: string;
//   Completed?: boolean;
//   Display?: boolean;
//   DateCreated?: Date;
// }
