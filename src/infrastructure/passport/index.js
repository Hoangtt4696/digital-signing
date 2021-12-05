import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserRepository from 'infrastructure/repositories/user';
import config from 'ds-config';

const { jwt: jwtConfig } = config;
const jwtOptions = {
  secretOrKey: jwtConfig.ACCESS_TOKEN_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, cbDone) => {
  try {
    if (payload.type !== jwtConfig.TOKEN_TYPES.ACCESS) {
      throw new Error('Invalid token type');
    }

    const user = await UserRepository.getUserByEmail(payload.email, 'email');

    cbDone(null, user && user.toJSON());
  } catch (error) {
    cbDone(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default { jwtStrategy };
