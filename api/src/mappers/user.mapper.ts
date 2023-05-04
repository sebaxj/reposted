import { IUser } from '../models/user.model';

export class UserMapper {
  /**
   * Private helper method to delete null or undefined values in an object
   * @param {object} obj - the object to delete null or undefined values from
   * @returns {object} - the object with null or undefined values deleted
   */
  private deleteNullUndefinedValues(obj): typeof obj {
    Object.keys(obj).forEach((key: string) => {
      obj[key as keyof typeof obj] != null ? {} : delete obj[key as keyof typeof obj];
    });
    return obj;
  }

  /**
   * Map from CreateNewUserDto to CreateNewUserDomain
   */
  public createNewUserDtoToDomain(userDto: UserTypes.CreateNewUserDto): UserTypes.CreateNewUserDomain {
    const userDomain: UserTypes.CreateNewUserDomain = {
      username: userDto.username,
      password: userDto.password,
    };

    return this.deleteNullUndefinedValues(userDomain);
  }

  /**
   * Map from IUser to UserEntity
   */
  public IUserToEntity(userDocument: IUser): UserTypes.UserEntity {
    return {
      _id: userDocument._id.toString(),
      username: userDocument.username as string,
      password: userDocument.password as string,
      createdAt: userDocument.createdAt as Date,
      updatedAt: userDocument.updatedAt as Date,
      __v: userDocument.__v as number,
    };
  }

  /**
   * Map from UserEntity to UserResponseDomain
   */
  public userEntityToDomain(userEntity: UserTypes.UserEntity): UserTypes.UserResponseDomain {
    return {
      _id: userEntity._id,
      username: userEntity.username,
      password: userEntity.password,
    };
  }

  /**
   * Map from UserResponseDomain to UserResponseDto
   */
  public UserResponseDomainToDto(userDomain: UserTypes.UserResponseDomain): UserTypes.UserResponseDto {
    return {
      username: userDomain.username,
    };
  }
}
