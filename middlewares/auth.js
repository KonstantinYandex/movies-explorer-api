const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');
const { JWT_SECRET } = require('../config');
const { NEED_TO_AUTHORIZE } = require('../utils/constants');

module.exports = (req, res, next) => {
  // const token = req.headers.authorization;
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(NEED_TO_AUTHORIZE);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError(NEED_TO_AUTHORIZE);
  }
  req.user = payload;

  return next();
};
