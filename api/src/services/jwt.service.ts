import * as jwt from 'jsonwebtoken';
import { MAX_TOKEN_AGE } from '../utils/constants';

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
}
