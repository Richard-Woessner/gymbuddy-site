import { Grid, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { useFireStore } from '../../providers/FireStoreProvider';
import { UserData } from '../../models/User';

const Home = () => {
  const auth = useAuth();
  const { clients, getClients, getMessages } = useFireStore();

  const hasClients = clients && clients.length > 0;
  const code = auth.user?.trainerData?.trainerCode;

  console.log(auth.user);

  useMemo(() => {
    if (auth.user?.trainerData) {
      getClients(auth.user.trainerData);
    }
  }, [auth.user]);

  useMemo(() => {
    console.log(clients);
  }, [clients]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div>Welcome to GymBuddy</div>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h4" gutterBottom>
          Add Clients today
        </Typography>

        <Typography>
          Tell your clients to download the GymBuddy app and enter your code{' '}
          <Typography variant="h6">#{code}</Typography>
          <br />
        </Typography>
        {hasClients ? (
          <div>
            {clients.map((client: UserData) => (
              <div key={client.uid}>{client.name}</div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
