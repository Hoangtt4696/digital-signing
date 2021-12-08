import Singer from 'infrastructure/signer';
import config from 'ds-config';

const singer = new Singer();

class Authenticate {
  async sign(file) {
    if (!file) {
      throw new Error('File is missing.');
    }

    await singer.signPDF();
  }
}

export default new Authenticate();
