// import packages
import { Router } from 'express';
import * as postController from '../controllers/post.controller';
import JwtService from '../services/jwt.service';

// routes
const router = Router();

//--------
// Create New Post
//--------
router.post('/create', JwtService.verifyJWT, postController.createPost);

// export to make importable by 'app.ts'
export default router;
