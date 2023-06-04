/**
 * Service for interacting with the user API
 */
import appleSignin, { AppleIdTokenType } from 'apple-signin-auth';
import UserMapper from '../mappers/user.mapper';
import UserRepository from '../repository/user.repository';
import { createLog, Logger } from '../utils/logger';

export default class UserService {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Method to create a new user
   * @param {string} idToken - the Apple ID token
   * @param {string | null} firstName - the user's first name
   * @param {string | null} lastName - the user's last name
   * @returns {Promise<UserTypes.UserResponseDomain & {created: boolean}>} - the created user domain
   */
  public authenticateUser(
    idToken: string,
    firstName: string | null,
    lastName: string | null,
  ): Promise<UserTypes.UserResponseDomain & { created: boolean }> {
    return new Promise((resolve, reject) => {
      appleSignin
        .verifyIdToken(idToken, { audience: 'com.reposted.app', ignoreExpiration: true, scope: 'name email' })
        .then((decodedIdToken: AppleIdTokenType) => {
          if (decodedIdToken.email_verified !== 'true' || !decodedIdToken.email_verified) {
            Logger.error(
              createLog('User email not verified', `Email: ${decodedIdToken.email} Token: ${idToken}`, null),
            );
            return reject('User email not verified');
          }

          // else, create user if they don't exist, return user document
          this.userRepository
            .authenticateUser(UserMapper.userRequestDtoToDomain({ email: decodedIdToken.email, firstName, lastName }))
            .then((user: UserTypes.UserResponseDomain & { created: boolean }) => {
              return resolve(user);
            })
            .catch((err: unknown) => {
              return reject(err);
            });
        })
        .catch((err: unknown) => {
          return reject(err);
        });
    });
  }

  /**
   * Method to get a ser by Mongo ID
   * @param {string} getUserId - the Mongo ID of the user to retrieve
   * @param {string} requestingUserId - the Mongo ID of the user making the request
   * @returns {Promise<UserTypes.UserResponseDomain>} promise which resolves to the user domain
   */
  public getUser(getUserId: string, requestingUserId: string): Promise<UserTypes.UserResponseDomain> {
    return new Promise((resolve, reject) => {
      this.userRepository
        .getUserById(getUserId, requestingUserId)
        .then((user: UserTypes.UserResponseDomain) => {
          return resolve(user);
        })
        .catch((err: unknown) => {
          return reject(err);
        });
    });
  }
}
