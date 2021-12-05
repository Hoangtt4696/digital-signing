import { Router } from 'express';
import authModule from 'modules/auth';

const router = Router();

router.route('/register').post(authModule.register);
router.route('/login').post(authModule.login);

export default router;
