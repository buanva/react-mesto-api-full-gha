require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleError = require('./middlewares/handleError');
const corsOptionsDelegate = require('./middlewares/cors');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { NotFound } = require('./errors/MyError');
const { pageNotFound } = require('./errors/messages');

const {
  validateLogin,
  validateCreateUser,
} = require('./middlewares/validation');

const { createUser, login } = require('./controllers/auth');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors(corsOptionsDelegate), bodyParser.json(), cookieParser(), requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use(auth);

app.use('/', usersRouter, cardsRouter);
app.use((_, res, next) => {
  next(new NotFound(pageNotFound));
});

app.use(errorLogger, errors(), handleError);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
