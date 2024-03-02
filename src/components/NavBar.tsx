import { Link } from 'react-router-dom';
import Styles from './NavBar.module.scss';
import React from 'react';
import { RoutesEnum } from '../App';

const Home = () => {
  return (
    <div className={Styles.navbar}>
      <Item to={RoutesEnum.HOME} text="Home" />
      <Item to={RoutesEnum.LOGIN} text="Login" />
      <Item to={RoutesEnum.REGISTER} text="Register" />
      <Item to={RoutesEnum.TEST} text="Test" />
      <Item to={RoutesEnum.MY_WORKOUT} text="My Workout" />
      <Item to={RoutesEnum.WORKOUTLOGS} text="Workout Logs" />
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
