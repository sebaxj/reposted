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

  /**
   * Map UserResponseDomain to UserResponseRestrictedDto
   * @param {UserTypes.UserResponseDomain} userResponseDomain
   * @returns {UserTypes.UserResponseRestrictedDto} user restricted DTO object
   */
  static userResponseDomainToRestrictedDto(
    userResponseDomain: UserTypes.UserResponseDomain,
  ): UserTypes.UserResponseRestrictedDto {
    return {
      _id: userResponseDomain._id,
      username: userResponseDomain.username,
      firstName: userResponseDomain.firstName,
      lastName: userResponseDomain.lastName,
      createdAt: userResponseDomain.createdAt,
    };
  }

  /**
   * Map UserResponseDomain to UserResponseFullDto
   * @param {UserTypes.UserResponseDomain} userResponseDomain
   * @returns {UserTypes.UserResponseFullDto} user restricted DTO object
   */
  static userResponseDomainToFullDto(userResponseDomain: UserTypes.UserResponseDomain): UserTypes.UserResponseFullDto {
    return {
      _id: userResponseDomain._id,
      username: userResponseDomain.username,
      email: userResponseDomain.email,
      firstName: userResponseDomain.firstName,
      lastName: userResponseDomain.lastName,
      createdAt: userResponseDomain.createdAt,
    };
  }
}
