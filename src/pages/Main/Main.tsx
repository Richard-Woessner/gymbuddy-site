import React from 'react';

import styles from './Main.module.scss';

function Main() {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Hello, world!</h1>
      <p className={styles.content}>test</p>
    </div>
  );
}

export default Main;
