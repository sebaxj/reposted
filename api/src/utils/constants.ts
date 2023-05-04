/**
 * Project-wide constants
 */

/**
 * Maximum age for JSON Web Tokens in seconds
 * Age is 3 hours
 * @type {number}
 */
export const MAX_TOKEN_AGE = 3 * 60 * 60;

/**
 * Maximum age for a cookie in milliseconds
 * Age is 3 hours
 * @type {number}
 */
export const MAX_COOKIE_AGE = 3 * 60 * 60 * 1000;

/**
 * HTTP status codes
 */
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
  SERVER_UNAVAILABLE = 503,
  REDIRECTED = 301,
}

/**
 * Constant Error codes
 */
export enum ErrorCode {
  JWT_DECODE_ERROR = 'JWT decode error.',
}

/**
 * MongoDB conntection timeout in milliseconds
 * @type {number}
 */
export const MONGO_CONN_TIMEOUT = 3000;
