const mongoose = require('mongoose');

// Простой пакет для валидации данных
const validator = require('validator');

// Спасибо
const validationUrl = {
  validate: {
    validator(url) {
      return validator.isURL(url);
    },
    message: 'Неккоректный url адрес',
  },
};

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    ...validationUrl,
  },
  trailer: {
    type: String,
    required: true,
    ...validationUrl,
  },
  thumbnail: {
    type: String,
    required: true,
    ...validationUrl,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
