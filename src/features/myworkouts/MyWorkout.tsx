import React, { useEffect, useMemo, useState } from 'react';
import WorkoutForm from './WorkoutForm';
import './WorkoutCard.scss';
import './MyWorkout.scss';
import { redirect, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { useAuth } from '../../providers/AuthProvider';
import { useFireStore } from '../../providers/FireStoreProvider';
import NoTrainee from '../../components/noTrainee/NoTrainee';

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

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
  onEdit,
  onDelete,
}) => {
  const [isExpanded, setExpanded] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [editedWorkout, setEditedWorkout] = useState({ ...workout });

  const toggleExpansion = () => {
    setExpanded(!isExpanded);
  };

  const toggleEdit = () => {
    setEditing(!isEditing);
  };

  const handleEditChange = (
    field: keyof typeof editedWorkout,
    value: string,
  ) => {
    setEditedWorkout((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = () => {
    onEdit(editedWorkout);
    setEditing(false);
  };

  return (
    <div className="workout-card">
      <div
        className={`workout-header ${isExpanded ? 'expanded' : ''}`}
        onClick={toggleExpansion}
      >
        <h3>{workout.name}</h3>
      </div>
      {isExpanded && (
        <div className="workout-details">
          {isEditing ? (
            <>
              <div>
                <label>Workout Name: </label>
                <input
                  type="text"
                  value={editedWorkout.name}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                />
              </div>
              <div>
                <label>Weights (lbs): </label>
                <input
                  type="text"
                  value={editedWorkout.weights}
                  onChange={(e) => handleEditChange('weights', e.target.value)}
                />
              </div>
              <div>
                <label>Sets: </label>
                <input
                  type="text"
                  value={editedWorkout.sets}
                  onChange={(e) => handleEditChange('sets', e.target.value)}
                />
              </div>
              <div>
                <label>Reps: </label>
                <input
                  type="text"
                  value={editedWorkout.reps}
                  onChange={(e) => handleEditChange('reps', e.target.value)}
                />
              </div>
              <div>
                <label>Trainee: </label>
                <select
                  value={editedWorkout.trainee}
                  onChange={(e) => handleEditChange('trainee', e.target.value)}
                >
                  <option value="">Select Trainee</option>
                  <option value="Trainee 1">Trainee 1</option>
                  <option value="Trainee 2">Trainee 2</option>
                  <option value="Trainee 3">Trainee 3</option>
                </select>
              </div>
              <div>
                <label>Comment: </label>
                <textarea
                  value={editedWorkout.comment}
                  onChange={(e) => handleEditChange('comment', e.target.value)}
                />
              </div>
              <button className="saveEdit-button" onClick={handleSaveEdit}>
                Save Edit
              </button>
            </>
          ) : (
            <>
              <p>
                Weights:{' '}
                <span className="bold-text">{workout.weights} lbs</span>
              </p>
              <p>
                Sets: <span className="bold-text">{workout.sets}</span>
              </p>
              <p>
                Reps: <span className="bold-text">{workout.reps}</span>
              </p>
              <p>
                Trainee: <span className="bold-text">{workout.trainee}</span>
              </p>
              <p>
                Comment: <span className="bold-text">{workout.comment}</span>
              </p>
              <button className="edit-button" onClick={toggleEdit}>
                Edit
              </button>
              <button className="delete-button" onClick={onDelete}>
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

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
    console.log('auth user', auth.user);
  }, []);
  if (auth.user == null) navigate(`/auth`, { replace: true }); // <-- redirect

  if (fs.currentClient == null) return <NoTrainee />;

  return (
    <div>
      <button className="create-workout-button" onClick={handleCreateWorkout}>
        Create Workout
      </button>

      {isFormVisible && (
        <WorkoutForm onSave={handleSaveWorkout} onClose={handleCloseForm} />
      )}

      <div className="workout-cards-wrapper">
        {workoutCards.map((card, index) => (
          <WorkoutCard
            key={index}
            workout={card}
            onEdit={(editedWorkout) => handleEditWorkout(index, editedWorkout)}
            onDelete={() => handleDeleteWorkout(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MyWorkout;
