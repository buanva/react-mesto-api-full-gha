const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors/MyError');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  needAuthorize,
} = require('../errors/messages');

module.exports = (req, _, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new Unauthorized(needAuthorize));
    return;
  }

  try {
    req.user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-dev');
    next();
  } catch (err) {
    next(new Unauthorized(needAuthorize));
  }
};
