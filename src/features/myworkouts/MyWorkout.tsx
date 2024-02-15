import React, { useState } from 'react';
import WorkoutForm from './WorkoutForm';
import './WorkoutCard.scss';

interface WorkoutCardProps {
  workout: {
    name: string;
    weights: string;
    reps: string;
    sets: string;
    trainee: string;
    comment: string;
  };
  onEdit: (editedWorkout: {
    name: string;
    weights: string;
    reps: string;
    sets: string;
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
                <label>Reps: </label>
                <input
                  type="text"
                  value={editedWorkout.reps}
                  onChange={(e) => handleEditChange('reps', e.target.value)}
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
                <label>Assign Trainee: </label>
                <select
                  value={editedWorkout.trainee}
                  onChange={(e) => handleEditChange('trainee', e.target.value)}
                >
                  <option value="">Select Trainee</option>
                  <option value="Trainee1">Trainee 1</option>
                  <option value="Trainee2">Trainee 2</option>
                  <option value="Trainee3">Trainee 3</option>
                </select>
              </div>
              <div>
                <label>Comment: </label>
                <textarea
                  value={editedWorkout.comment}
                  onChange={(e) => handleEditChange('comment', e.target.value)}
                />
              </div>
              <button onClick={handleSaveEdit}>Save Edit</button>
            </>
          ) : (
            <>
              <p>Weights: {workout.weights} lbs</p>
              <p>Reps: {workout.reps}</p>
              <p>Sets: {workout.sets}</p>
              <p>Assign Trainee: {workout.trainee}</p>
              <p>Comment: {workout.comment}</p>
              <button onClick={toggleEdit}>Edit</button>
              <button onClick={onDelete}>Delete</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const MyWorkout = () => {
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

  return (
    <div>
      <p>Workout Page</p>
      <button onClick={handleCreateWorkout}>Create Workout</button>

      {isFormVisible && (
        <WorkoutForm onSave={handleSaveWorkout} onClose={handleCloseForm} />
      )}

      {workoutCards.map((card, index) => (
        <WorkoutCard
          key={index}
          workout={card}
          onEdit={(editedWorkout) => handleEditWorkout(index, editedWorkout)}
          onDelete={() => handleDeleteWorkout(index)}
        />
      ))}
    </div>
  );
};

export default MyWorkout;
