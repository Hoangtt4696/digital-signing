import jwt from 'jsonwebtoken';
import config from 'ds-config';

const { jwt: jwtConfig } = config;

export const generateToken = (payload, type = jwtConfig.TOKEN_TYPES.ACCESS, expires) => {
  let expiresIn = expires || jwtConfig.ACCESS_TOKEN_EXPIRATION;
  let secretKey = jwtConfig.ACCESS_TOKEN_SECRET;

  const payloadToken = { ...payload, type };

  if (type === jwtConfig.TOKEN_TYPES.REFRESH) {
    expiresIn = expires || jwtConfig.REFRESH_TOKEN_EXPIRATION;
    secretKey = jwtConfig.REFRESH_TOKEN_SECRET;
  }

  return jwt.sign(payloadToken, secretKey, { expiresIn });
};
