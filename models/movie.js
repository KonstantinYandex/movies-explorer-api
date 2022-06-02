const mongoose = require('mongoose');
const validator = require('validator');
const { REQUIRED_INPUT, IS_LINK } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, REQUIRED_INPUT],
  },
  director: {
    type: String,
    required: [true, REQUIRED_INPUT],
  },
  duration: {
    type: Number,
    required: [true, REQUIRED_INPUT],
  },
  year: {
    type: Number,
    required: [true, REQUIRED_INPUT],
  },
  description: {
    type: String,
    required: [true, REQUIRED_INPUT],
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: IS_LINK,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: IS_LINK,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: IS_LINK,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, REQUIRED_INPUT],
  },
  movieId: {
    type: Number,
    ref: 'movie',
    required: [true, REQUIRED_INPUT],
    unique: true,
  },
  nameRU: {
    type: String,
    required: [true, REQUIRED_INPUT],
  },
  nameEN: {
    type: String,
    required: [true, REQUIRED_INPUT],
  },
});

module.exports = mongoose.model('movie', movieSchema);
