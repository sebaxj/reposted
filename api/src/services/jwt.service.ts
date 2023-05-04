import * as jwt from 'jsonwebtoken';
import { MAX_TOKEN_AGE } from '../utils/constants';

export class JwtService {
  /**
   * Sign a JWT token from a User domain object
   * @param {UserTypes.UserResponseDomain} userDomain - user to sign token for
   * @returns {string} - signed
   */
  public signJWT(userDomain: UserTypes.UserResponseDomain): string {
    return jwt.sign(
      {
        _id: userDomain._id,
        username: userDomain.username,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: MAX_TOKEN_AGE,
      },
    );
  }
}
