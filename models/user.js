const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { REQUIRED_INPUT, WRONG_EMAIL_OR_PASSWORD, NOT_VALID_EMAIL } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, REQUIRED_INPUT],
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
  },
  password: {
    type: String,
    required: [true, REQUIRED_INPUT],
    select: false,
  },
  email: {
    type: String,
    required: [true, REQUIRED_INPUT],
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: NOT_VALID_EMAIL,
    },
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(WRONG_EMAIL_OR_PASSWORD));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(WRONG_EMAIL_OR_PASSWORD));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
