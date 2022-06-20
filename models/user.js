const mongoose = require('mongoose');

// Простой пакет для валидации данных
const vadidator = require('validator');

// Хэширует пароль
const bcrypt = require('bcryptjs');

// Ошибки
const UnauthorizedError = require('../errorsHandler/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Специальная функция валидации, возвращает булев тип.
    // Первым параметром функция принимает поле для валидации.
    validate: {
      validator(email) {
        return vadidator.isEmail(email);
      },
      message: 'Неккоректный email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
    validate: {
      validator(password) {
        return vadidator.isStrongPassword(password, {
          minUppercase: false,
          minSymbols: false,
        });
      },
      message: 'Ненадежный пароль',
    },
  },
});

// Функция findUserByCredentials не должна быть стрелочной.
// Собственный метод. Поиск пользователя
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password, next) {
  // Здесь нужен пароль
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new UnauthorizedError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

// Хук сработает перед тем как сохранить данные в бд,
// для коректного валидирования пароля на уровне схемы.
// Срабатывает при создании и обновлении схемы
userSchema.pre('save', function savePassword(next) {
  if (!this.isModified('password')) return next();

  return bcrypt.hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => next(err));
});

module.exports = mongoose.model('user', userSchema);
