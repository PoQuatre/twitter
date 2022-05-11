const { Schema, model } = require('mongoose');

const HashtagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tweets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
    },
  ],
});

const HashtagModel = model('Hashtag', HashtagSchema);

module.exports = { HashtagModel };
