import React from 'react';
import { Link } from 'react-router-dom';

interface Trainee {
  id: number;
  name: string;
}

const traineesPage = () => {
  const logoUrl = 'https://cdn-icons-png.flaticon.com/512/7922/7922268.png';

  const traineeList: Trainee[] = [
    { id: 1, name: 'Trainee 1' },
    { id: 2, name: 'Trainee 2' },
    { id: 3, name: 'Trainee 3' },
    { id: 4, name: 'Trainee 4' },
    { id: 5, name: 'Trainee 5' },
    { id: 6, name: 'Trainee 6' },
  ];

  const renderTrainee = (trainee: Trainee) => (
    <div style={{ textAlign: 'center', width: '30%' }} key={trainee.id}>
      <p>{trainee.name}</p>
      <Link to={`/trainee${trainee.id}`}>
        <img
          src={logoUrl}
          alt={trainee.name}
          style={{ width: '100px', height: 'auto' }}
        />
      </Link>
    </div>
  );

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        GymBuddy Trainees Page
        <img
          src={logoUrl}
          alt="GymBuddy Logo"
          style={{
            width: '150px',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
          }}
        />
      </h1>
      <h2 style={{ textAlign: 'center' }}></h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        {traineeList.map(renderTrainee)}
      </div>
    </div>
  );
};
export default traineesPage;
