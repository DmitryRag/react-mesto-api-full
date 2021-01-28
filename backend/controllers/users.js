const bcrypt = require('bcryptjs'); // добавили базу хеширования
const jwt = require('jsonwebtoken'); // модуль jwt
const User = require('../models/user');
const ServerError = require('../errors/server-error');
const NotFoundError = require('../errors/not-found-error');
const BadReqError = require('../errors/bad-req-error');
const ConflictError = require('../errors/conflict-error');
const NotAuthError = require('../errors/not-auth-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => next(new ServerError('Ошибка сервера')));
};

const getProfile = (req, res, next) => {
  const { id } = req.params;
  User.findOne({ _id: id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.status(200).send(user);
    })
    .catch(() => next(new ServerError('Ошибка сервера')));
};

const getCurrentUser = (req, res, next) => {
  const id = req.user._id;
  User.findById({ _id: id })
    .then((user) => res.status(200).send(user))
    .catch(() => next(new ServerError('Ошибка сервера')));
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => User.find({ _id: user._id }))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadReqError('Некорректные данные');
      }
      if (err.code === 11000) {
        throw new ConflictError('Такой пользователь уже существует');
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => next(new NotAuthError('Неверный логин или пароль')));
};

module.exports = {
  getUsers, getProfile, getCurrentUser, createUser, login,
};
