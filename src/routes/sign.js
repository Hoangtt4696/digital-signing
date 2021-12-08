import { Router } from 'express';
import signModule from 'modules/sign';
import Multer from 'multer';

const router = Router();
const multer = Multer();

router.route('/sign').post(multer.single('file'), signModule.sign);

export default router;
