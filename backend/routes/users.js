const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getProfile,
  createUser,
  getCurrentUser,
  updateAvatar,
  updateUser,
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

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), updateAvatar);

module.exports = router;
