import React, { useEffect, useMemo, useState } from 'react';
import WorkoutForm from './WorkoutForm';
import { redirect, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { useAuth } from '../../providers/AuthProvider';
import { useFireStore } from '../../providers/FireStoreProvider';
import NoTrainee from '../../components/noTrainee/NoTrainee';
import Styles from './MyWorkout.module.scss';
import WorkoutCard from '../../components/workoutCard/WorkoutCard';

interface WorkoutCardProps {
  workout: {
    name: string;
    weights: string;
    sets: string;
    reps: string;
    trainee: string;
    comment: string;
  };
  onEdit: (editedWorkout: {
    name: string;
    weights: string;
    sets: string;
    reps: string;
    trainee: string;
    comment: string;
  }) => void;
  onDelete: () => void;
}

const MyWorkout = () => {
  const fs = useFireStore();
  const [isFormVisible, setFormVisible] = useState(false);
  const [workoutCards, setWorkoutCards] = useState<
    {
      name: string;
      weights: string;
      reps: string;
      sets: string;
      trainee: string;
      comment: string;
    }[]
  >([]);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleCreateWorkout = () => {
    setFormVisible(true);
  };

  const handleSaveWorkout = (workoutData: {
    name: string;
    weights: string;
    reps: string;
    sets: string;
    trainee: string;
    comment: string;
  }) => {
    setWorkoutCards((prevWorkouts) => [...prevWorkouts, workoutData]);
  };

  const handleEditWorkout = (
    index: number,
    editedWorkout: {
      name: string;
      weights: string;
      reps: string;
      sets: string;
      trainee: string;
      comment: string;
    },
  ) => {
    setWorkoutCards((prevWorkouts) => [
      ...prevWorkouts.slice(0, index),
      editedWorkout,
      ...prevWorkouts.slice(index + 1),
    ]);
  };

  const handleDeleteWorkout = (index: number) => {
    setWorkoutCards((prevWorkouts) => [
      ...prevWorkouts.slice(0, index),
      ...prevWorkouts.slice(index + 1),
    ]);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  useEffect(() => {
    if (fs.clientWorkouts.length == 0) {
      fs.getWorkouts().then((workouts) => {
        console.log(workouts);
      });
    }
  }, []);

  useEffect(() => {
    console.log('auth user', auth.user);
  }, []);
  if (auth.user == null) navigate(`/auth`, { replace: true }); // <-- redirect

  if (fs.currentClient === null) return <NoTrainee />;

  return (
    <div>
      <button className="create-workout-button" onClick={handleCreateWorkout}>
        Create Workout
      </button>

      {isFormVisible && (
        <WorkoutForm onSave={handleSaveWorkout} onClose={handleCloseForm} />
      )}

      <div className={Styles.myWorkoutContainer}>
        <div className={Styles.clientWorkouts}>
          {fs.clientWorkouts
            .filter((x) => x.ClientUid == fs.currentClient?.uid)[0]
            .Workouts.map((clientWorkout, index) => {
              return <WorkoutCard workout={clientWorkout} key={index} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default MyWorkout;
