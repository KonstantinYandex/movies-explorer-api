// Подключаю специальный метод Router для работы с маршрутами
const router = require('express').Router();

// Ошибки
const NotFoundError = require('../errorsHandler/NotFoundError');

// Мидлвэа для защиты маршрутов
const { auth } = require('../middlewares/auth');

const routerAuth = require('./auth');
const routerUsers = require('./users');
const routerMovies = require('./movies');

router.use('/', routerAuth);
router.use('/users', auth, routerUsers);
router.use('/movies', auth, routerMovies);
// Если нет корректного маршрута
router.use(auth, (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));

module.exports = router;
