/**
 * Globally available User interfaces and types
 */
namespace UserTypes {
  /**
   * CreateNewUserDto interface
   */
  interface CreateNewUserDto {
    username: string;
    password: string;
  }

  /**
   * CreateNewUserDomain interface
   */
  interface CreateNewUserDomain extends CreateNewUserDto {}

  /**
   * UserResponseDto interface
   */
  interface UserResponseDto {
    username: string;
  }

  /**
   * UserResponseDomain interface
   */
  interface UserResponseDomain extends UserResponseDto {
    _id: string;
    password: string;
  }

  /**
   * UserEntity interface
   */
  interface UserEntity extends UserResponseDomain {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }
}
