import { IPost } from '../models/post.model';

export default class PostMapper {
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
   * Map IPost to PostResponseDomain
   * @param {IPost} postDocument
   * @returns {PostTypes.PostResponseDomain}
   */
  static IPostToPostResponseDomain(postDocument: IPost): PostTypes.PostResponseDomain {
    return {
      _id: postDocument._id.toString(),
      userId: postDocument.userId.toString(),
      url: postDocument.url,
      source: postDocument.source,
      createdAt: postDocument.createdAt,
    };
  }

  /**
   * Map CreatePostDto to CreatePostDomain
   * @param {PostTypes.CreatePostDto} createPostDto
   * @returns {PostTypes.CreatePostDomain}
   */
  static createPostDtoToDomain(createPostDto: PostTypes.CreatePostDto): PostTypes.CreatePostDomain {
    if (!createPostDto.url || !createPostDto.source) throw new Error('url and source are required');

    return {
      userId: createPostDto.userId,
      url: createPostDto.url,
      source: createPostDto.source,
    };
  }

  /**
   * Map PostResponseDomain to PostResponseDto
   * @param {PostTypes.PostResponseDomain} postResponseDomain
   * @returns {PostTypes.PostResponseDto}
   */
  static postResponseDomainToDto(postResponseDomain: PostTypes.PostResponseDomain): PostTypes.PostResponseDto {
    return {
      _id: postResponseDomain._id,
      userId: postResponseDomain.userId,
      url: postResponseDomain.url,
      source: postResponseDomain.source,
      createdAt: postResponseDomain.createdAt,
    };
  }
}
