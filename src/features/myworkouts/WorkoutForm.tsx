import React, { useState } from 'react';

interface WorkoutFormProps {
  onSave: (workoutData: {
    name: string;
    weights: string;
    reps: string;
    sets: string;
    comment: string;
  }) => void;
  onClose: () => void;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSave, onClose }) => {
  const [name, setName] = useState('');
  const [weights, setWeights] = useState('0');
  const [reps, setReps] = useState('0');
  const [sets, setSets] = useState('0');
  const [comment, setComment] = useState('');

  const handleSave = () => {
    onSave({ name, weights, reps, sets, comment });
    onClose();
  };

  return (
    <div className="workout-form">
      <div>
        <label>Name: </label>
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
        <label>Reps: </label>
        <input
          type="text"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
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
        <label>Comment: </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default WorkoutForm;
