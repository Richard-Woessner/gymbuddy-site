import React from 'react';

import { Button } from 'primereact/button';

import styles from './Main.module.scss';

function Main() {
  return (
    <div className={styles.container}>
      <div>
        <h3>test</h3>
        <Button>te</Button>
      </div>

      <div>
        <h1 className={styles.title}>Hello, world!</h1>
        <p className={styles.content}>test</p>
      </div>
    </div>
  );
}

export default Main;
