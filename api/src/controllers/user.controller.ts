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
import UserMapper from '../mappers/user.mapper';

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

    // return OK response
    return res.status(HttpStatus.OK).json(response(userDomain, null, null));
  } catch (err: unknown) {
    // log error
    Logger.error(createLog("Can't authenticate user", `${err}`, req));
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response(null, `${err}`, null));
  }
};

//--------
// Get a User by ID
//--------
export const getUser = async (req: Request, res: Response) => {
  try {
    // get user
    if (!req.params.id) {
      // no id provided
      Logger.error(createLog('No id provided', `getUser requested by ${req.body.jwt._id}`, 'user.controller'));
      return res.status(HttpStatus.BAD_REQUEST).json(response(null, 'No id provided', null));
    }

    const userDomain: UserTypes.UserResponseDomain = await userService.getUser(
      req.params.id as string,
      req.body.jwt._id,
    );

    // return OK response
    return res
      .status(HttpStatus.OK)
      .json(
        response(
          req.params.id === req.body.jwt._id
            ? UserMapper.userResponseDomainToFullDto(userDomain)
            : UserMapper.userResponseDomainToRestrictedDto(userDomain),
          null,
          null,
        ),
      );
  } catch (err: unknown) {
    // log error
    Logger.error(createLog(`Can't get user ${req.params.id} requested by ID ${req.body.jwt._id}`, `${err}`, 'getUser'));
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response(null, `${err}`, null));
  }
};
