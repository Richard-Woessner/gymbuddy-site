import { Link } from 'react-router-dom';
import Styles from './NavBar.module.scss';
import React from 'react';
import { RoutesEnum } from '../App';

const Home = () => {
  return (
    <div className={Styles.navbar}>
      <Item to={RoutesEnum.HOME} text="Home" />
      <Item to={RoutesEnum.TEST} text="Test" />
    </div>
  );
};

interface ItemProps {
  text: string;
  to: string;
}

const Item = (props: ItemProps) => {
  const { text, to } = props;
  return (
    <div className={Styles.navbarItem}>
      <Link to={to}>{text}</Link>
    </div>
  );
};

export default Home;
