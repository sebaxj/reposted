import { MongooseError, ModifyResult, Document } from 'mongoose';
import { IUser, User } from '../models/user.model';
import { createLog, Logger } from '../utils/logger';
import { ErrorCode } from '../utils/constants';
import UserMapper from '../mappers/user.mapper';

export default class UserRepository {
  /**
   * Method to authenticate a new user
   * @param {UserTypes.UserRequestDomain} userRequestDomain - the user to be authenticated
   * @returns {Promise<UserResponseDomain & {created: boolean}>} promise which resolves to the user object if successful
   */
  public authenticateUser(
    userRequestDomain: UserTypes.UserRequestDomain,
  ): Promise<UserTypes.UserResponseDomain & { created: boolean }> {
    return new Promise((resolve, reject) => {
      // find and upsert user
      User.findOneAndUpdate({ email: userRequestDomain.email }, userRequestDomain, {
        upsert: true,
        new: true,
        runValidators: true,
        rawResult: true,
      })
        .then(
          (
            user: ModifyResult<
              Document<unknown, any, IUser> &
                Omit<
                  IUser &
                    Required<{
                      _id: string;
                    }>,
                  never
                >
            >,
          ) => {
            return resolve({
              ...UserMapper.IUserToUserResponseDomain(user.value as IUser),
              created: !user.lastErrorObject?.updatedExisting,
            });
          },
        )
        .catch((err: MongooseError) => {
          // error saving the user
          Logger.error(createLog(ErrorCode.UNABLE_TO_AUTHENTICATE, `Email: ${userRequestDomain.email}.`, err.message));
          return reject(err.message);
        });
    });
  }

  /**
   * Method to get a user by Mongo ID
   * @param {string} getUserId - the Mongo ID of the user to retrieve
   * @param {string} requestingUserId - the Mongo ID of the user making the request
   * @returns {Promise<UserTypes.UserResponseDomain>} promise which resolves to the user domain object
   */
  public getUserById(getUserId: string, requestingUserId: string): Promise<UserTypes.UserResponseDomain> {
    return new Promise((resolve, reject) => {
      User.findById(getUserId)
        .then((user: IUser | null) => {
          if (!user) {
            Logger.error(
              createLog(
                ErrorCode.USER_NOT_FOUND,
                `User not found. ID: ${getUserId} requested by ${requestingUserId}`,
                null,
              ),
            );
            return reject(ErrorCode.USER_NOT_FOUND);
          }

          return resolve(UserMapper.IUserToUserResponseDomain(user));
        })
        .catch((err: MongooseError) => {
          // error getting the user
          Logger.error(createLog(ErrorCode.MONGOOSE_ERROR, err.name, err.message));
          return reject(err.message);
        });
    });
  }
}
