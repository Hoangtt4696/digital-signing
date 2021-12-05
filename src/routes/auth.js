import { Router } from 'express';
import authModule from 'modules/auth';

const router = Router();

router.route('/register').post(authModule.register);

export default router;
