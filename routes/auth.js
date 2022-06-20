// Подключаю специальный метод Router для работы с маршрутами
const router = require('express').Router();

// Joi schemes
const { createUserJoi, logInJoi } = require('../middlewares/joiSchemes');

// Контроллеры
const {
  createUser, logIn,
} = require('../controllers/users');

router.post(
  '/signup',
  createUserJoi,
  createUser,
);
router.post(
  '/signin',
  logInJoi,
  logIn,
);

module.exports = router;
