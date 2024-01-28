import Styles from './NavBar.module.scss';
import React from 'react';

const Home = () => {
  return (
    <div className={Styles.navbar}>
      <Item text="Home" />
    </div>
  );
};

interface ItemProps {
  text: string;
}

const Item = (props: ItemProps) => {
  const { text } = props;
  return (
    <div className={Styles.navbarItem}>
      <div>{text}</div>
    </div>
  );
};

export default Home;
