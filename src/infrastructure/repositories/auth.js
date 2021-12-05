import models from 'infrastructure/models';

class AuthRepository {
  constructor() {
    this.model = models.tokens;
  }

  saveToken(userId, data, options) {
    return this.model.findOneAndUpdate({ user_id: userId }, data, { upsert: true, ...(options || {}) });
  }
}

export default new AuthRepository();
