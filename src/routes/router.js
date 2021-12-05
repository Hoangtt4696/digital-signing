import express from 'express';
import authRoute from 'routes/auth';

const router = express.Router();

router.use(authRoute);

export default router;
