import { Link } from 'react-router-dom';
import Styles from './NavBar.module.scss';
import React from 'react';
import { RoutesEnum } from '../App';
import Logo from './logo.png';

const Home = () => {
  return (
    <div className={Styles.navbar}>
      <img src={Logo} alt="Logo" className={Styles.logo} />

      {/* Navigation Items */}
      <Item to={RoutesEnum.MY_WORKOUT} text="My Workout" />
      <Item to={RoutesEnum.HOME} text="Trainees" />
      <Item to={RoutesEnum.WORKOUTLOGS} text="Workout Logs" />
      <Item to={RoutesEnum.TEST} text="Messages" />
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
