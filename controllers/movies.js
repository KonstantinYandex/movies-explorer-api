const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request');
const { VALIDATION_ERROR, NOT_FOUND_MOVIE } = require('../utils/constants');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(200).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(VALIDATION_ERROR);
      }
      throw err;
    })
    .catch(next);
};

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie || movie.owner.toString() !== req.user._id) {
        throw new NotFoundError(NOT_FOUND_MOVIE);
      }
      movie.remove()
        .then(() => {
          res.send({ message: 'Этот фильм удалён' });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(VALIDATION_ERROR);
      }
      throw err;
    })
    .catch(next);
};

module.exports = { createMovie, getMovies, deleteMovie };
