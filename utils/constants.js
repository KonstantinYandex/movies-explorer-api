const errorMessage = {
  users: {
    invalidDataСreatingUser: 'Переданы некорректные данные при создании пользователя',
    userExistsEmail: 'Пользователь с таким Email уже существует',
    invalidDataUpdatingProfile: 'Переданы некорректные данные при обновлении профиля',
    userNotExists: 'Пользователь не существует, либо был удален',
    userNotFound: 'Запрашиваемый пользователь не найден',
  },
  movies: {
    invalidDataСreatingMovie: 'Переданы некорректные данные при создании фильма',
    movieNotExists: 'Фильм не существует, либо был удален',
    movieByIdNotFound: 'Фильм с указанным _id не найден',
    movieAnotherUserNotDelete: 'Нельзя удалить сохраненный фильм другого пользователя',
  },
};

module.exports = {
  errorMessage,
};
