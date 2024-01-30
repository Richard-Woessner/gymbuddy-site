import React, { useState } from 'react';
import WorkoutForm from './WorkoutForm';

const MyWorkout = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [workoutCards, setWorkoutCards] = useState(
    [] as {
      name: string;
      weights: string;
      reps: string;
      sets: string;
      comment: string;
    }[],
  );

  const handleCreateWorkout = () => {
    setFormVisible(true);
  };

  const handleSaveWorkout = (workoutData: {
    name: string;
    weights: string;
    reps: string;
    sets: string;
    comment: string;
  }) => {
    setWorkoutCards((prevWorkouts) => [...prevWorkouts, workoutData]);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  return (
    <div>
      <p>Workout Page</p>
      <button onClick={handleCreateWorkout}>Create Workout</button>

      {isFormVisible && (
        <WorkoutForm onSave={handleSaveWorkout} onClose={handleCloseForm} />
      )}

      {workoutCards.map((card, index) => (
        <div key={index} className="workout-card">
          <h3>{card.name}</h3>
          <p>Weights: {card.weights} lbs</p>
          <p>Reps: {card.reps}</p>
          <p>Sets: {card.sets}</p>
          <p>Comment: {card.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default MyWorkout;
