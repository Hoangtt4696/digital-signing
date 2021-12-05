import models from 'infrastructure/models';

class UserRepository {
  constructor() {
    this.model = models.users;
  }

  getUserByEmail(email, attrs) {
    return this.model.findOne({ email }, attrs).exec();
  }

  createUser(data) {
    return this.model.create(data);
  }
}

export default new UserRepository();
