import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import styles from './newTweet.module.css';
import Col from 'react-bootstrap/Col';
import Logo from '../Logo';

function NewTweet() {
  const [tweetMessage, setTweetMessage] = useState([{ id: 1, value: 'check' }]);
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const sendTweet = (e) => {
    e.preventDefault();
    if (input !== '') {
      console.log('na');
      const tweetDetails = {
        id: Math.floor(Math.random() * 1000),
        value: input,
      };
      setInput('');
      setTweetMessage((messages) => [tweetDetails, ...messages]);
    }
  };

  const deleteTweet = (e, id) => {
    e.preventDefault();
    setTweetMessage(tweetMessage.filter((tweet) => tweet.id != id));
  };

  return (
    <Col md={6}>
      <div className={styles.tweetbox}>
        <form onSubmit={(e) => sendTweet(e)}>
          <div className=" border-bottom">
            <h1>home</h1>
          </div>
          <div className={styles.tweetboxInput}>
            <input
              value={input}
              onChange={(e) => handleChange(e)}
              placeholder="Prosternez vous et écoutez moi?"
              type="text"
            />
          </div>
          <Button type="submit" className={styles.tweetboxButton}>
            Tweet
          </Button>
        </form>
      </div>
      <div>
        {tweetMessage.map((tweet) => (
          <div className=" d-flex flex-column">
            <div className="tweetMessage">{tweet.value}</div>
            <Button
              type="submit"
              className={styles.tweetboxButton}
              onClick={(e) => deleteTweet(e, tweet.id)}
            >
              x
            </Button>
          </div>
        ))}
      </div>
    </Col>
  );
}

export default NewTweet;
