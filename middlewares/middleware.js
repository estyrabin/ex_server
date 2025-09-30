const { isToken } = require('../services/tokenService');

function isLoggedin(req, res, next) {
  const auth = req.headers.authorization || '';
  const headerToken = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  const token = headerToken || null;

  if (token && isToken(token)) return next();
  
  return res.status(401).json({ message: 'unauthorized' });
}

module.exports = { isLoggedin };
