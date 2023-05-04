// import packages
import { Router } from 'express';
import * as indexController from '../controllers/index.controller';

// routes
const router = Router();

//--------
// Base Healthcheck route
//--------
router.get('/', indexController.healthCheck);

// export to make importable by 'app.ts'
export default router;
