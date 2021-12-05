import AuthService from 'domain/auth';
import resError from 'utils/rest-error';
import resResponse from 'utils/handle-response';

class AuthModule {
  async register(req, res, next) {
    try {
      const {
        body: { email, password },
      } = req;
      const { user, tokens } = await AuthService.registerAndGenerateToken(email, password);
      const response = resResponse(200, true, { user, tokens });

      res.send(response);
    } catch (error) {
      next(resError(400, error));
    }
  }

  async login(req, res, next) {
    try {
      const {
        body: { email, password },
      } = req;
      const { user, tokens } = await AuthService.login(email, password);
      const response = resResponse(200, true, { user, tokens });

      res.send(response);
    } catch (error) {
      next(resError(400, error));
    }
  }
}

export default new AuthModule();
