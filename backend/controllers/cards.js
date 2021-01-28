/* eslint-disable no-shadow */
const Card = require('../models/card');
/* const User = require('../models/user'); */
const ServerError = require('../errors/server-error');
const BadReqError = require('../errors/bad-req-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => next(new ServerError('Ошибка сервера')));
};

const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadReqError('Ошибка валидации');
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const id = req.user._id;
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      if (card.owner.toString() !== id) {
        throw new ForbiddenError('Недостаточно прав для удаления карточки');
      } else {
        Card.findByIdAndDelete(req.params.cardId)
          .then((card) => {
            res.status(200).send(card);
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = { getCards, createCard, deleteCard };
