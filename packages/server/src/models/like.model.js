const { Schema, model } = require('mongoose');

const LikeSchema = new Schema({
  createdAt: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tweet: {
    type: Schema.Types.ObjectId,
    ref: 'Tweet',
  },
  retweet: {
    type: Schema.Types.ObjectId,
    ref: 'Retweet',
  },
});

const LikeModel = model('Like', LikeSchema);

module.exports = { LikeModel };
