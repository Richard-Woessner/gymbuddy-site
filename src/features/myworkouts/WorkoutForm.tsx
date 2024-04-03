import React, { useState } from 'react';
import './MyWorkout.module.scss';

interface WorkoutFormProps {
  onSave: (workoutData: {
    name: string;
    weights: string;
    reps: string;
    sets: string;
    comment: string;
    trainee: string;
  }) => void;
  onClose: () => void;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSave, onClose }) => {
  const [name, setName] = useState('');
  const [weights, setWeights] = useState('0');
  const [reps, setReps] = useState('0');
  const [sets, setSets] = useState('0');
  const [comment, setComment] = useState('');
  const [trainee, setTrainee] = useState('');

  const handleSave = () => {
    onSave({ name, weights, reps, sets, comment, trainee });
    onClose();
  };

  return (
    <div className="workout-form-popup">
      <div>
        <label>Workout Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Weights (lbs): </label>
        <input
          type="text"
          value={weights}
          onChange={(e) => setWeights(e.target.value)}
        />
      </div>

      <div>
        <label>Sets: </label>
        <input
          type="text"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
      </div>

      <div>
        <label>Reps: </label>
        <input
          type="text"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
      </div>

      <div>
        <label>Trainee: </label>
        <select value={trainee} onChange={(e) => setTrainee(e.target.value)}>
          <option value="">Select Trainee</option>
          <option value="Trainee1">Trainee 1</option>
          <option value="Trainee2">Trainee 2</option>
          <option value="Trainee3">Trainee 3</option>
        </select>
      </div>

      <div>
        <label>Comment: </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <div>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default WorkoutForm;
