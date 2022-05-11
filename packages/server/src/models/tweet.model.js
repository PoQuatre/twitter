const { Schema, model } = require('mongoose');

const TweetSchema = new Schema({
  createdAt: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tweet: {
    type: Schema.Types.ObjectId,
    ref: 'Tweet',
  },
  quote: {
    type: Schema.Types.ObjectId,
    ref: 'Tweet',
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
    },
  ],
  retweets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Retweet',
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Like',
    },
  ],
  hashtags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Hashtag',
    },
  ],
});

const TweetModel = model('Tweet', TweetSchema);

module.exports = { TweetModel };
