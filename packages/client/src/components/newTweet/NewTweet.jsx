import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import styles from './newTweet.module.css';
import Col from 'react-bootstrap/Col';

function NewTweet() {
  const [tweetMessage, setTweetMessage] = useState('');

  const sendTweet = (e) => {
    e.preventDefault();
    setTweetMessage('');
  };

  return (
    <Col md={6}>
      <div className={styles.tweetbox}>
        <form>
          <div className=" border-bottom">
            <h1>home</h1>
          </div>
          <div className={styles.tweetboxInput}>
            <input
              value={tweetMessage}
              onChange={(e) => setTweetMessage(e.target.value)}
              placeholder="Prosternez vous et écoutez moi?"
              type="text"
            />
          </div>
          <Button
            onClick={sendTweet}
            type="submit"
            className={styles.tweetboxButton}
          >
            Tweet
          </Button>
        </form>
      </div>
    </Col>
  );
}

export default NewTweet;
