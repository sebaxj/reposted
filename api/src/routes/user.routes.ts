// import packages
import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import JwtService from '../services/jwt.service';

// routes
const router = Router();

//--------
// Authenticate User
//--------
router.post('/authenticate', userController.authenticateUser);

//--------
// GET /:id
//--------
router.get('/:id', JwtService.verifyJWT, userController.getUser);

// export to make importable by 'app.ts'
export default router;
