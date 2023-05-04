/**
 * Service for interacting with the user API
 */

import { UserRepository } from '../repository/user.repository';

export class UserService {
  userRepository: UserRepository = new UserRepository();

  constructor() {}

  /**
   * Method to create a new user
   * @param {CreateNewUserDomain} createNewUserDomain - the domain for a user API request
   * @returns {Promise<UserEntity>} - the created user
   */
  public createUser(createNewUserDomain: UserTypes.CreateNewUserDomain): Promise<UserTypes.UserResponseDomain> {
    return new Promise((resolve, reject) => {
      this.userRepository
        .createUser(createNewUserDomain)
        .then((createdUser: UserTypes.UserResponseDomain) => {
          return resolve(createdUser);
        })
        .catch((err: string) => {
          return reject(err);
        });
    });
  }
}
