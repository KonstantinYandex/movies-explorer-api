// Валидация тела запроса от клиента
const { celebrate, Joi } = require('celebrate');

// Подключаю свою функцию валидации url адресса для celebrate
const validUrl = require('../utils/validUrl');

const createUserJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const logInJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const createMovieJoi = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validUrl),
    trailer: Joi.string().required().custom(validUrl),
    thumbnail: Joi.string().required().custom(validUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieJoi = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

const updateProfileJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports = {
  createUserJoi,
  logInJoi,
  createMovieJoi,
  deleteMovieJoi,
  updateProfileJoi,
};
