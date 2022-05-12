const router = require('express').Router();
const { UserModel } = require('../models');

router.get('/:handle', async (req, res) => {
  const handle = req.params.handle;

  try {
    const user = await UserModel.findOne({ handle }).exec();
    if (user === null) {
      res.status(404).json({
        success: false,
        msg: 'User does not exist',
      });
    } else {
      res.json({
        username: user.username,
        handle: user.handle,
        tweets: user.tweets,
        followers: user.followers,
        follows: user.follows,
        retweets: user.retweets,
        likes: user.likes,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: 'An error occurred while processing your request',
    });
    console.log(error);
  }
});

module.exports = router;
