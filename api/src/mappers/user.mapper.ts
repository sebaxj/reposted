import { IUser } from '../models/user.model';

export default class UserMapper {
  /**
   * Private helper method to delete null or undefined values in an object
   * @param {object} obj - the object to delete null or undefined values from
   * @returns {object} - the object with null or undefined values deleted
   */
  static deleteNullUndefinedValues(obj): typeof obj {
    Object.keys(obj).forEach((key: string) => {
      obj[key as keyof typeof obj] != null ? {} : delete obj[key as keyof typeof obj];
    });
    return obj;
  }

  /**
   * Map UserRequestDto to UserRequestDomain
   * @param {UserTypes.UserRequestDto} userDto
   * @returns {UserTypes.UserRequestDomain} user request domain
   */
  static userRequestDtoToDomain(userDto: UserTypes.UserRequestDto): UserTypes.UserRequestDomain {
    return this.deleteNullUndefinedValues(userDto);
  }

  /**
   * Map IUser to UserResponseDomain
   * @param {IUser} userDocument
   * @returns {UserTypes.UserResponseDomain} user repsonse domain
   */
  static IUserToUserResponseDomain(userDocument: IUser): UserTypes.UserResponseDomain {
    return {
      _id: userDocument._id,
      username: userDocument.username,
      firstName: userDocument.firstName,
      lastName: userDocument.lastName,
      email: userDocument.email,
      createdAt: userDocument.createdAt,
    };
  }
}
