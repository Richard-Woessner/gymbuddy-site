/* eslint-disable func-style */
import React, { useEffect } from 'react';

import instance from '@api/api';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import styles from './Main.module.scss';

function Main() {
  const [workoutName, setWorkoutName] = React.useState('');
  const [exercisesName, setExerciseName] = React.useState('');

  const [repOne, setRepOne] = React.useState('');
  const [repTwo, setRepTwo] = React.useState('');
  const [repThree, setRepThree] = React.useState('');

  const [weightOne, setWeightOne] = React.useState('');
  const [weightTwo, setWeightTwo] = React.useState('');
  const [weightThree, setWeightThree] = React.useState('');

  const handlePost = () => {
    const workout = {
      Name: workoutName,
      Exercises: [
        {
          Exercise: exercisesName,
          Sets: [
            {
              Weight: weightOne,
              Reps: repOne,
              SetNumber: 1,
            },
            {
              Weight: weightTwo,
              Reps: repTwo,
              SetNumber: 2,
            },
            {
              Weight: weightThree,
              Reps: repThree,
              SetNumber: 3,
            },
          ],
          Type: 'Lift',
        },
      ],
    };

    instance
      .patch('/api/workouts', {
        userId: '6urOxvgJCsYFv0ZaIY2IG1lx7ZC2',
        workout,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    instance
      .get('/api/workouts', {
        params: { userId: '6urOxvgJCsYFv0ZaIY2IG1lx7ZC2' },
      })
      .then((res) => {
        console.log(res);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.exerciseCol}>
        <h1>Create Workout</h1>
        <div className={styles.exerciseHeader}>
          <h3>Add Exercise</h3>
          <Button
            style={{ height: '2rem', width: '2rem', marginLeft: '2rem' }}
            size="small"
            icon="pi pi-plus"
          />
        </div>

        <InputText
          placeholder="Workout Name"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
        />

        <div className={styles.exercise}>
          <InputText
            placeholder="Exercise Name"
            value={exercisesName}
            onChange={(e) => setExerciseName(e.target.value)}
          />
          <div className={styles.repsHeader}>
            <div>Reps</div>
            <div>Weight</div>
          </div>

          <div className={styles.reps}>
            <InputText
              value={repOne}
              onChange={(e) => setRepOne(e.target.value)}
            />
            <InputText
              value={weightOne}
              onChange={(e) => setWeightOne(e.target.value)}
            />
          </div>

          <div className={styles.reps}>
            <InputText
              value={repTwo}
              onChange={(e) => setRepTwo(e.target.value)}
            />
            <InputText
              value={weightTwo}
              onChange={(e) => setWeightTwo(e.target.value)}
            />
          </div>

          <div className={styles.reps}>
            <InputText
              value={repThree}
              onChange={(e) => setRepThree(e.target.value)}
            />
            <InputText
              value={weightThree}
              onChange={(e) => setWeightThree(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <Button onClick={handlePost}>Post</Button>
        </div>
      </div>

      <div>
        <h1 className={styles.title}>.</h1>
        <p className={styles.content}>.</p>
      </div>
    </div>
  );
}

// interface GetWorkoutsResponse {
//   User: string;
//   Workouts: Workout[];
// }

// interface Workout {
//   Name: string;
//   Exercises: Exercise[];
// }

// interface Exercise {
//   Exercise: string;
//   Sets: Set[];
//   Type: string;
// }

// interface Set {
//   Weight: number;
//   Reps: number;
//   SetNumber: number;
// }

export default Main;
