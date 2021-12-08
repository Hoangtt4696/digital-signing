import SignService from 'domain/sign';
import resError from 'utils/rest-error';
import resResponse from 'utils/handle-response';

class AuthModule {
  async sign(req, res, next) {
    try {
      const { file } = req;

      await SignService.sign(file);

      const response = resResponse(200, true, true);

      res.send(response);
    } catch (error) {
      next(resError(400, error));
    }
  }
}

export default new AuthModule();
