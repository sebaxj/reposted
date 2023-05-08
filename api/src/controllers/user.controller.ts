/*
 * This file contains the functions for the 'index' endpoint.
 * These are used in 'index.router.ts' for the corresponsing functions
 * to each CRUD request.
 */
import { Request, Response } from 'express';
import { response } from '../types/responseDto.interface';
import { HttpStatus, MAX_COOKIE_AGE } from '../utils/constants';
import { createLog, Logger } from '../utils/logger';
import UserService from '../services/user.service';
import JwtService from '../services/jwt.service';

const userService: UserService = new UserService();

//--------
// Autnehticate a User
//--------
export const authenticateUser = async (req: Request, res: Response) => {
  try {
    // authenticate user
    const userDomain: UserTypes.UserResponseDomain & { created: boolean } = await userService.authenticateUser(
      req.body.idToken,
      req.body.firstName,
      req.body.lastName,
    );

    // attach JWT as cookie
    res.cookie('jwt', JwtService.signJWT(userDomain), {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: MAX_COOKIE_AGE,
    });

    return res.status(HttpStatus.OK).json(response(userDomain, null, null));
  } catch (err: unknown) {
    // log error
    Logger.error(createLog("Can't authenticate user", `${err}`, req));
    res.status(HttpStatus.SERVER_UNAVAILABLE).json(response(null, `${err}`, null));
  }
};
