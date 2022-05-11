require('dotenv').config();
const express = require('express');
const passport = require('./config/passport');
const session = require('express-session');
const morgan = require('morgan');
const compression = require('compression');
const { registerClient } = require('./config/registerClient');
const mongoose = require('mongoose');
const { AuthRouter } = require('./routes');

if (!process.env.MONGO_URL) {
  throw new Error('The environment variable `MONGO_URL` is not set!');
}

if (!process.env.SESSION_SECRET) {
  throw new Error('The environment variable `SESSION_SECRET` is not set!');
}

mongoose.connect(process.env.MONGO_URL);

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(morgan('common'));
if (process.env.NODE_ENV === 'production') {
  app.use(compression());
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', AuthRouter);

registerClient(app); // Keep this line after all your routes

const PORT = parseInt(process.env.PORT || '') || 8080;
app.listen(PORT, () => {
  console.log(`The server is listening on http://localhost:${PORT}`);
});
