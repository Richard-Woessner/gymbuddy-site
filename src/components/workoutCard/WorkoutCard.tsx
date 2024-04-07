import React from 'react';
import { Workout } from '../../models/Workout';
import styles from './WorkoutCard.module.scss';

interface CardProps {
  workout: Workout;
}

const Card: React.FC<CardProps> = ({ workout }) => {
  const { Name, Exercises } = workout;
  console.log(workout);

  return (
    <div className={styles.card}>
      <p className={styles.cardTitle}>{Name}</p>
      {Exercises.map((exercise, i) => {
        return (
          <div key={i}>
            <p key={i} className={styles.exerciseTitle}>
              {exercise.Exercise}
            </p>
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
        <div className={styles.date}>{workout.DateCreated?.toDateString()}</div>
      </div>
    </div>
  );
};

export default Card;
