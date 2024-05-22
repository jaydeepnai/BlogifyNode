const jwt = require('jsonwebtoken');

const createJWT = ({ payload,expiresIn }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET,
    { expiresIn });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user,expiresIn: '1d' });

  const oneDay = 1000 * 60 * 60 * 24;
  const oneDayInSeconds = oneDay / 1000;

  res.cookie('token', token, {
    httpOnly: true,
    // expires: Math.floor(Date.now() / 1000) + oneDayInSeconds,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
