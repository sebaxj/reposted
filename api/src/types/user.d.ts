/**
 * Globally available User interfaces and types
 */
namespace UserTypes {
  /**
   * UserResponseDomain interface
   */
  interface UserResponseDomain {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
  }

  /**
   * CreateUserDomain interface
   */
  interface UserRequestDomain {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  }

  /**
   * UserRequestDto interface {
   */
  interface UserRequestDto {
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
  }
}
