const router = require('express').Router();
const routerUsers = require('./user');
const routerMovies = require('./movie');
const NotFoundError = require('../errors/not-found-error');

router.use(routerUsers);
router.use(routerMovies);

router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
