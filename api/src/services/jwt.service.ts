import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { HttpStatus, MAX_TOKEN_AGE } from '../utils/constants';
import { Logger, createLog } from '../utils/logger';
import { response } from '../types/responseDto.interface';

interface DecodedJWT extends jwt.JwtPayload {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default class JwtService {
  /**
   * Sign a JWT token from a User domain object
   * @param {UserTypes.UserResponseDomain} userDomain - user to sign token for
   * @returns {string} - signed
   */
  static signJWT(userDomain: UserTypes.UserResponseDomain): string {
    return jwt.sign(
      {
        _id: userDomain._id,
        username: userDomain.username,
        firstName: userDomain.firstName,
        lastName: userDomain.lastName,
        email: userDomain.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: MAX_TOKEN_AGE,
      },
    );
  }

  /**
   * Verify a JWT token
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {() => void} next - next middleware function
   * @returns {void | Response} - void if token is valid, Response if not
   */
  static verifyJWT(req: Request, res: Response, next: () => void): void | Response {
    const token: string | undefined = req.cookies.jwt;

    if (!token) {
      // token is undefined
      Logger.error(createLog('JWT token is undefined', 'JwtService', 'verifyJWT'));
      return res.status(HttpStatus.UNAUTHORIZED).json(response(null, 'JWT token is undefined', null));
    }

    try {
      // decode the token
      const decodedToken: DecodedJWT = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedJWT;
      req.body.jwt = decodedToken;
      next();
    } catch (err: unknown) {
      Logger.error(createLog('Error decoding the JWT', JSON.stringify(err), 'verifyJWT'));
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response(null, err, null));
    }
  }
}
