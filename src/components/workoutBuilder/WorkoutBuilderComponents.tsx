import React, { ChangeEventHandler } from 'react';
import { Grid, TextField, Button, Alert, Snackbar } from '@mui/material';
import { Exercise, Workout } from '../../models/Workout';
import { deepCopy, generateRandomString } from '../../helpers/Func';
import styles from './WorkoutBuilder.module.scss';
import { useFireStore } from '../../providers/FireStoreProvider';
import { UserData } from '../../models/User';

export {};

export interface InputTextProps {
  label: string;
}

export const InputText = (props: InputTextProps) => {
  const { label } = props;
  return (
    <Grid container xs={12} justifyContent={'space-between'}>
      <Grid item>
        <TextField id={label} label={label} variant="standard" />
      </Grid>
      <Grid item alignSelf={'self-end'}>
        <Button variant={'outlined'}>Add Exercise</Button>
      </Grid>
    </Grid>
  );
};

interface ExerciseBuilderProps {
  exercise: Exercise;
  workout: Workout;
  setWorkout: (workout: Workout) => void;
  client: UserData;
}

export const ExerciseBuilder = (props: ExerciseBuilderProps) => {
  const fs = useFireStore();
  const { exercise, workout, setWorkout, client } = props;
  const [alertOpen, setAlertOpen] = React.useState<{
    message: string;
    open: boolean;
  }>({ message: '', open: false });

  const setName = (name: string) => {
    const tempWorkout = deepCopy(workout);
    const tempExercise = tempWorkout.Exercises.find(
      (x: Exercise) => x.Id == exercise.Id,
    );

    if (tempExercise) {
      tempExercise.Exercise = name;
    }

    setWorkout(tempWorkout);
  };

  const addSet = () => {
    console.log(exercise);

    const tempWorkout = deepCopy(workout);
    const tempExercise = tempWorkout.Exercises.find(
      (x: Exercise) => x.Id == exercise.Id,
    );

    if (tempExercise) {
      tempExercise.Sets.push({
        SetNumber: tempExercise.Sets.length + 1,
        Reps: 0,
        Weight: 0,
      });
    }

    setWorkout(tempWorkout);
  };

  const removeSet = () => {
    const tempWorkout = deepCopy(workout);
    const tempExercise = tempWorkout.Exercises.find(
      (x: Exercise) => x.Id == exercise.Id,
    );

    if (tempExercise) {
      tempExercise.Sets.pop();
    }

    setWorkout(tempWorkout);
  };

  const setRep = (setNumber: number, reps: number) => {
    const tempWorkout = deepCopy(workout);
    const tempExercise = tempWorkout.Exercises.find(
      (x: Exercise) => x.Id == exercise.Id,
    );

    if (tempExercise) {
      const tempSet = tempExercise.Sets.find(
        (x: any) => x.SetNumber == setNumber,
      );

      if (tempSet) {
        tempSet.Reps = reps;
      }
    }

    console.log(tempWorkout);

    setWorkout(tempWorkout);
  };

  const setWeight = (setNumber: number, weight: number) => {
    const tempWorkout = deepCopy(workout);
    const tempExercise = tempWorkout.Exercises.find(
      (x: Exercise) => x.Id == exercise.Id,
    );

    if (tempExercise) {
      const tempSet = tempExercise.Sets.find(
        (x: any) => x.SetNumber == setNumber,
      );

      if (tempSet) {
        tempSet.Weight = weight;
      }
    }

    console.log(tempWorkout);

    setWorkout(tempWorkout);
  };

  const postWorkout = () => {
    console.log(workout);

    if (workout.Name === '') {
      setAlertOpen({
        message: 'Workout name is required',
        open: true,
      });
    }

    const emptySets = workout.Exercises.filter((x) => x.Sets.length === 0);

    if (emptySets.length > 0) {
      setAlertOpen({
        message: 'Sets are required',
        open: true,
      });
    }

    if (workout.Exercises.length === 0) {
      setAlertOpen({
        message: 'No exercises to post',
        open: true,
      });
    }

    fs.postWorkout(workout, client);

    setWorkout({
      Name: '',
      Id: generateRandomString(9),
      Exercises: [],
    });
  };

  return (
    <Grid container item justifyContent={'space-between'}>
      <Grid item>
        <TextField
          id="outlined-basic"
          label="Exercise Name"
          variant="standard"
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>
      <Grid item alignSelf={'self-end'}>
        <Grid container item gap={1}>
          <Button variant={'outlined'} onClick={addSet} size="small">
            Add Set
          </Button>
          <Button
            variant={'outlined'}
            onClick={removeSet}
            size="small"
            color="error"
          >
            Del Set
          </Button>
        </Grid>
      </Grid>
      <Grid container item spacing={2} direction={'row'} marginTop={2}>
        {exercise.Sets.length > 0 && (
          <>
            <Grid item justifyContent={'center'}>
              <Grid item>Reps</Grid>
              {exercise.Sets.map((set) => {
                const key = `${exercise.Id}-${set.SetNumber}`;

                return (
                  <Grid item key={set.SetNumber}>
                    <NumberInput
                      label={key}
                      onChange={(e) =>
                        setRep(set.SetNumber, e.target.valueAsNumber)
                      }
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Grid item>
              <Grid item>Weight</Grid>
              {exercise.Sets.map((set) => {
                const key = `${exercise.Id}-${set.SetNumber}`;

                return (
                  <Grid item key={set.SetNumber}>
                    <NumberInput
                      label={key}
                      onChange={(e) =>
                        setWeight(set.SetNumber, e.target.valueAsNumber)
                      }
                    />
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
      </Grid>
      <Grid item>
        <Button variant={'outlined'} onClick={postWorkout}>
          Post Workout
        </Button>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={alertOpen.open}
        autoHideDuration={5000}
        onClose={() =>
          setAlertOpen((prevState) => ({ ...prevState, open: false }))
        }
        message={alertOpen.message}
        key={'topright'}
        color="error"
      />
    </Grid>
  );
};

const NumberInput = (props: {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  const { label, onChange } = props;
  return (
    <input
      type="number"
      name={label}
      className={styles.numberInput}
      onChange={onChange}
    />
  );
};
