const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.EXPIRES_IN || '1h'; 

function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = { generateToken, verifyToken };
