const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getProfile,
  createUser,
  getCurrentUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);

router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().min(24).hex(),
  }),
}), getProfile);

router.post('/users', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
}), createUser);

module.exports = router;
