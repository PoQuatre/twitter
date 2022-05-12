const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  createdAt: Date,
  profilePicture: String,
  bio: String,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
    unique: true,
  },
  follows: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  tweets: [
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

const UserModel = model('User', UserSchema);

module.exports = { UserModel };
