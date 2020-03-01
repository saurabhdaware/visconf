const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAuthToken = id => {
  const token = jwt.sign(
    {uid: id}, 
    process.env.AUTH_SECRET, 
    {expiresIn: '2h', algorithm: 'HS256'}
  );

  return token;
}

const getUidFromToken = token => {
  const decoded = jwt.verify(token, process.env.AUTH_SECRET);
  return decoded.uid;
}

const getHash = async password => {
  return bcrypt.hash(password, saltRounds);
}

module.exports = {
  getAuthToken,
  getUidFromToken,
  getHash
}