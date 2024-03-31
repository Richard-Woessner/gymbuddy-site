import React from 'react';

const NoTrainee: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>No Trainee selected</h1>
      <p>Please Select a trainee on the navBar</p>
    </div>
  );
};

export default NoTrainee;
