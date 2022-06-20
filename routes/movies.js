// Подключаю специальный метод Router для работы с маршрутами
const router = require('express').Router();
// Joi schemes
const { createMovieJoi, deleteMovieJoi } = require('../middlewares/joiSchemes');

const {
  createMovie,
  getMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovie);
router.post(
  '/',
  createMovieJoi,
  createMovie,
);
router.delete(
  '/:movieId',
  deleteMovieJoi,
  deleteMovie,
);

module.exports = router;
