import { Button } from 'react-bootstrap';
import styles from './followBack.module.css';
import React from 'react';

function FollowBack() {
  return (
    <>
      <div>
        <div>
          <h2>Qui me suis ?</h2>
        </div>
        <div className={styles.follow}>
          <div className={styles.followuser}>
            <h4>Adam</h4>
            <span>@adam</span>
          </div>
          <Button className={styles.followBtn}>Follow</Button>
        </div>
      </div>
    </>
  );
}

export default FollowBack;
