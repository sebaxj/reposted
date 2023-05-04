import { HydratedDocument, MongooseError } from 'mongoose';
import { IUser, User } from '../models/user.model';
import { createLog, Logger } from '../utils/logger';
import { ErrorCode } from '../utils/constants';
import { UserMapper } from '../mappers/user.mapper';

export class UserRepository {
  userMapper: UserMapper = new UserMapper();

  constructor() {}

  /**
   * Method to create a new user
   * @param {CreateNewUserDomain} createNewUserDomain - the user to be created
   * @returns {Promise<UserResponseDomain>} promise which resolves to the user object if successful
   */
  public createUser(createNewUserDomain: UserTypes.CreateNewUserDomain): Promise<UserTypes.UserResponseDomain> {
    return new Promise((resolve, reject) => {
      // create new user object
      const newUser: HydratedDocument<IUser> = new User(createNewUserDomain);

      // save new user document to User collection
      newUser
        .save()
        .then((savedUser: IUser) => {
          // map the saved user back to the domain
          return resolve(this.userMapper.userEntityToDomain(this.userMapper.IUserToEntity(savedUser)));
        })
        .catch((err: MongooseError) => {
          // error saving the user
          Logger.error(createLog(ErrorCode.UNABLE_TO_CREATE_USER, `Username: ${newUser.username}.`, err.message));
          return reject(err.message);
        });
    });
  }
}
