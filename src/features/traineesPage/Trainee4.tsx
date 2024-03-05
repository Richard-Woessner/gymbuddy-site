import React, { useState } from 'react';

type Category = 'Trainee personal information' | 'Body information' | 'Goals';

type Item = {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  age?: string;
  weight?: string;
  height?: string;
  goalBodyWeight?: string;
  desiredGoals?: string;
};

type Data = Record<Category, Item[]>;

const Trainee4: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    'Trainee personal information',
  );
  const [data, setData] = useState<Data>({
    'Trainee personal information': [
      { id: 1, firstName: '', lastName: '', email: '', phoneNumber: '' },
    ],
    'Body information': [{ id: 1, age: '', weight: '', height: '' }],
    Goals: [{ id: 1, goalBodyWeight: '', desiredGoals: '' }],
  });

  const handleChange = (
    category: Category,
    id: number,
    key: string,
    value: string,
  ) => {
    setData((prevData) => ({
      ...prevData,
      [category]: prevData[category].map((item) =>
        item.id === id ? { ...item, [key]: value } : item,
      ),
    }));
  };

  return (
    <div style={{ display: 'flex' }}>
      <table
        style={{
          borderCollapse: 'separate',
          borderSpacing: '0 1em',
          width: '50%',
          borderRadius: '1em',
        }}
      >
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>
              <button
                onClick={() =>
                  setSelectedCategory('Trainee personal information')
                }
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  padding: 0,
                  fontWeight:
                    selectedCategory === 'Trainee personal information'
                      ? 'bold'
                      : 'normal',
                }}
              >
                Trainee personal information
              </button>
            </th>
            <th style={{ textAlign: 'left' }}>
              <button
                onClick={() => setSelectedCategory('Body information')}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  padding: 0,
                  fontWeight:
                    selectedCategory === 'Body information' ? 'bold' : 'normal',
                }}
              >
                Body information
              </button>
            </th>
            <th style={{ textAlign: 'left' }}>
              <button
                onClick={() => setSelectedCategory('Goals')}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  padding: 0,
                  fontWeight: selectedCategory === 'Goals' ? 'bold' : 'normal',
                }}
              >
                Goals
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {selectedCategory === 'Trainee personal information' && (
            <tr>
              <td style={{ padding: '0 1em' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '1em' }}>First Name</div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#f2f2f2',
                      padding: '0.5em',
                      borderRadius: '1em',
                      margin: '0.5em 0',
                      width: '70%',
                    }}
                  >
                    {data['Trainee personal information'][0].firstName ||
                      `First name`}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '1em' }}>Last Name</div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#f2f2f2',
                      padding: '0.5em',
                      borderRadius: '1em',
                      margin: '0.5em 0',
                      width: '70%',
                    }}
                  >
                    {data['Trainee personal information'][0].lastName ||
                      'Last Name'}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '1em' }}>Email</div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#f2f2f2',
                      padding: '0.5em',
                      borderRadius: '1em',
                      margin: '0.5em 0',
                      width: '70%',
                    }}
                  >
                    {data['Trainee personal information'][0].email ||
                      'Trainee1@email.com'}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '1em' }}>Phone Number</div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#f2f2f2',
                      padding: '0.5em',
                      borderRadius: '1em',
                      margin: '0.5em 0',
                      width: '70%',
                    }}
                  >
                    {data['Trainee personal information'][0].phoneNumber ||
                      '(123)456-7890'}
                  </div>
                </div>
              </td>
            </tr>
          )}
          {selectedCategory === 'Body information' && (
            <tr>
              <td style={{ padding: '0 1em' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '1em' }}>Age</div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#f2f2f2',
                      padding: '0.5em',
                      borderRadius: '1em',
                      margin: '0.5em 0',
                      width: '70%',
                    }}
                  >
                    {data['Body information'][0].age || '21'}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '1em' }}>Weight</div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#f2f2f2',
                      padding: '0.5em',
                      borderRadius: '1em',
                      margin: '0.5em 0',
                      width: '70%',
                    }}
                  >
                    {data['Body information'][0].weight || '210 lbs'}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '1em' }}>Height</div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#f2f2f2',
                      padding: '0.5em',
                      borderRadius: '1em',
                      margin: '0.5em 0',
                      width: '70%',
                    }}
                  >
                    {data['Body information'][0].height || '5"11'}
                  </div>
                </div>
              </td>
            </tr>
          )}
          {selectedCategory === 'Goals' && (
            <tr>
              <td style={{ padding: '0 1em' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '1em' }}>Desired body weight</div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#f2f2f2',
                      padding: '0.5em',
                      borderRadius: '1em',
                      margin: '0.5em 0',
                      width: '70%',
                    }}
                  >
                    {data.Goals[0].goalBodyWeight || '180 lbs'}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '1em' }}>Desired goals</div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#f2f2f2',
                      padding: '0.5em',
                      borderRadius: '1em',
                      margin: '0.5em 0',
                      width: '70%',
                    }}
                  >
                    {data.Goals[0].desiredGoals || 'Gain muscle and lose fat'}
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ width: '50%' }}>
        <table>
          <thead>
            <tr>
              <th>Workout Assigned</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Squat</td>
            </tr>
            <tr>
              <td>Bench Press</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trainee4;
