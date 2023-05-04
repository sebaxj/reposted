/**
 * ResponseDto interface
 */
export interface ResponseDto {
  /**
   * Data returned in the response DTO.
   * Contains the body  of the request if  successful, null otherwise.
   */
  data: unknown;
  /**
   * Error report returned in the response DTO.
   * Contains the error code and summary, null otherwise.
   */
  error: unknown;
  /**
   * Meta data returned in the response DTO.
   * Contains meta data relevant to the returned response, null otherwise.
   */
  meta: unknown;
}

/**
 * Function to generate a ResponseDto Object
 * @param data {any}
 * @param error {any}
 * @param meta {any}
 * @return {ResponseDto}
 */
export function response(data: unknown, error: unknown, meta: unknown): ResponseDto {
  return {
    data: data,
    error: error,
    meta: meta,
  };
}
