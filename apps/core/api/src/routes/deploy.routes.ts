import { Router } from 'express';
import { deployController } from '../controllers/deploy.controller.js';
import { validateDeploy } from '../middlewares/validator.js';

const router = Router();

router.post('/deploy', validateDeploy, deployController);

export default router;
