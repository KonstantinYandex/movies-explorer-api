require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const clientErrorHandler = require('./middlewares/clientErrorHandler');
const router = require('./routes/index');
const limiter = require('./middlewares/limiter');

const { PORT = 3000, DB_ADDRESS = 'mongodb://localhost:27017/moviesdb' } = process.env;
const app = express();

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};

app.use(cors);

app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errors());
app.use(errorLogger);
app.use(clientErrorHandler);

app.listen(PORT);
