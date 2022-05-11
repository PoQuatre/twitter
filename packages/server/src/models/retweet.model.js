const { Schema, model } = require('mongoose');

const RetweetSchema = new Schema({
  createdAt: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tweet: {
    type: Schema.Types.ObjectId,
    ref: 'Tweet',
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Like',
    },
  ],
});

const RetweetModel = model('Retweet', RetweetSchema);

module.exports = { RetweetModel };
