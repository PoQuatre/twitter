require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const { registerClient } = require('./config/registerClient');
const mongoose = require('mongoose');

if (!process.env.MONGO_URL) {
  throw new Error('The environment variable `MONGO_URL` is not set!');
}
mongoose.connect(process.env.MONGO_URL);

const app = express();

app.disable('x-powered-by');
app.use(morgan('common'));
if (process.env.NODE_ENV === 'production') {
  app.use(compression());
}

app.get('/api/hello', (req, res) => {
  res.send('Hello from the server!');
});

registerClient(app); // Keep this line after all your routes

const PORT = parseInt(process.env.PORT || '') || 8080;
app.listen(PORT, () => {
  console.log(`The server is listening on http://localhost:${PORT}`);
});
