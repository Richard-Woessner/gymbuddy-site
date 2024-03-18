import { Link, useNavigate } from 'react-router-dom';
import Styles from './NavBar.module.scss';
import React, { useEffect, useMemo } from 'react';
import { RoutesEnum } from '../App';
import Logo from './logo.png';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useAuth } from '../providers/AuthProvider';
import { useFireStore } from '../providers/FireStoreProvider';
import { UserData } from '../models/User';

const Home = () => {
  const [trainee, setTrainee] = React.useState('');
  const navigate = useNavigate();
  const auth = useAuth();
  const { clients, currentClient, currentClientUid, setCurrentClientUid } =
    useFireStore();

  const hasClients = clients && clients.length > 0;

  useMemo(() => {
    const signupPage = window.location.href.split('/').pop() === 'sign-up';

    if (auth.user === null && !signupPage) {
      navigate('/auth', { replace: true });
    }
  }, [navigate]);

  return (
    <div className={Styles.navbar}>
      <img src={Logo} alt="Logo" className={Styles.logo} />

      {/* Navigation Items */}
      <Item to={RoutesEnum.MY_WORKOUT} text="My Workout" />
      <Item to={RoutesEnum.HOME} text="Trainees" />
      <Item to={RoutesEnum.WORKOUTLOGS} text="Workout Logs" />
      <Item to={RoutesEnum.MESSAGES} text="Messages" />

      {hasClients && (
        <div className={Styles.endContainer}>
          <FormControl className={Styles.dropdown}>
            <InputLabel id="trainee-dropdown">Trainee</InputLabel>
            <Select
              labelId="trainee-dropdown"
              id="simple-select"
              value={currentClientUid || undefined}
              label="Age"
              onChange={(e) => setCurrentClientUid(e.target.value)}
            >
              {clients!.map((client: UserData) => (
                <MenuItem key={client.uid} value={client.uid}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
};

interface ItemProps {
  text: string;
  to: string;
}

const Item = (props: ItemProps) => {
  return (
    <div className={Styles.navbarItem}>
      <Link to={props.to}>{props.text}</Link>
    </div>
  );
};

export default Home;
