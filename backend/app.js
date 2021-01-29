const express = require('express'); // подключаем модуль экспресс

require('dotenv').config(); // модуль генерации ключей

const cors = require('cors');

const app = express(); // сохраняем экспресс в переменную
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');

const auth = require('./middlewares/auth');
const cardsRouter = require('./routes/cards'); // импортировали роутер карточек
const usersRouter = require('./routes/users'); // импортировали роутер пользователей
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env; // адрес порта

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
}); // подключаемся к мангусту

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(bodyParser.json());
app.use(requestLogger); // подключаем логгер запросов
app.use(cors());

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
}), login);

app.use('/cards', auth, cardsRouter); // запустили роутер карточек
app.use('/users', auth, usersRouter); // запустили роутер пользователей

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
}); // обработали несуществующий адрес для всех видов запросов ---------------------------------

// централизованный обработчик ошибок
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}: http://localhost:3000`);
});
