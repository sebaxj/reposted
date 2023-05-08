// import packages
import { Router } from 'express';
import * as userController from '../controllers/user.controller';

// routes
const router = Router();

//--------
// Base Healthcheck route
//--------
router.post('/authenticate', userController.authenticateUser);

// export to make importable by 'app.ts'
export default router;
