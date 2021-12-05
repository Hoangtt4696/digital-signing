import bcrypt from 'bcrypt';
import moment from 'moment';
import UserRepository from 'infrastructure/repositories/user';
import AuthRepository from 'infrastructure/repositories/auth';
import config from 'ds-config';
import { generateToken } from 'infrastructure/jwt';

const { jwt: jwtConfig } = config;

class Authenticate {
  async encryptPassword(password) {
    if (!password) {
      return false;
    }

    const salt = await bcrypt.genSaltSync(parseInt(jwtConfig.SALT_ENCRYPTION, 10));

    return bcrypt.hashSync(password, salt);
  }

  comparePassword(newPass, pass) {
    if (!newPass || !pass) {
      return false;
    }

    return bcrypt.compareSync(newPass, pass);
  }

  async registerAndGenerateToken(email, password) {
    if (!email || !password) {
      throw new Error('Email or password is missing.');
    }

    let user = await UserRepository.getUserByEmail(email, 'email');

    if (user) {
      throw new Error('Email already exists.');
    }

    const newUser = await UserRepository.createUser({
      email,
      password: await this.encryptPassword(password),
    });

    const tokens = await this.generateAuthTokens(newUser);

    return { user: newUser, tokens };
  }

  async generateAuthTokens(user) {
    delete user.password;

    const [accessToken, refreshToken] = await Promise.all([
      generateToken(user),
      generateToken(user, jwtConfig.TOKEN_TYPES.REFRESH),
    ]);

    await AuthRepository.saveToken(user.id, {
      user_id: user.id,
      token: refreshToken,
      type: jwtConfig.TOKEN_TYPES.REFRESH,
      expires: moment().add(jwtConfig.REFRESH_TOKEN_EXPIRATION, 'milliseconds'),
    });

    return {
      access: accessToken,
      refresh: refreshToken,
    };
  }

  async login(email, password) {
    if (!email || !password) {
      throw new Error('Email or password is missing.');
    }

    const user = await UserRepository.getUserByEmail(email);

    if (!user || !this.comparePassword(password, user.password)) {
      throw new Error('Email or password is incorrect.');
    }

    const tokens = await this.generateAuthTokens(user);

    return { user, tokens };
  }
}

export default new Authenticate();
