import React from 'react';
import { Workout } from '../../models/Workout';
import styles from './WorkoutCard.module.scss';
import { Timestamp } from 'firebase/firestore';
import { Grid, IconButton } from '@mui/material';
import { DeleteForever } from '@mui/icons-material';
import { useFireStore } from '../../providers/FireStoreProvider';
import NoTrainee from '../noTrainee/NoTrainee';

interface CardProps {
  workout: Workout;
}

const Card: React.FC<CardProps> = ({ workout }) => {
  const fs = useFireStore();
  const client = fs.currentClient;
  const { Name, Exercises } = workout;
  console.log(workout);

  const TimeStampToDate = (timestamp?: Timestamp) => {
    if (!timestamp) {
      return new Date();
    }

    return timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date();
  };

  if (!client) {
    return <NoTrainee />;
  }

  return (
    <div className={styles.card}>
      <p className={styles.cardTitle}>{Name}</p>
      {Exercises.map((exercise, i) => {
        return (
          <div key={i}>
            <Grid container justifyContent={'space-between'}>
              <p key={i} className={styles.exerciseTitle}>
                {exercise.Exercise}
              </p>
              <IconButton
                aria-label="delete"
                onClick={() => fs.deleteWorkout(workout, client)}
              >
                <DeleteForever />
              </IconButton>
            </Grid>
            <div className={styles.exerciseInfo}>
              <div className={styles.row}>
                <div>Sets</div>
                <div>{exercise.Sets.length}</div>
              </div>
              <div className={styles.row}>
                <div>Reps</div>
                <div>{exercise.Sets.reduce((a, b) => a + b.Reps, 0)}</div>
              </div>
            </div>
          </div>
        );
      })}
      <div className={styles.footer}>
        <div className={styles.date}>
          {TimeStampToDate(workout.DateCreated).toDateString()}
        </div>
      </div>
    </div>
  );
};

export default Card;
