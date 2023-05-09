import { HydratedDocument, MongooseError } from 'mongoose';
import { createLog, Logger } from '../utils/logger';
import { ErrorCode } from '../utils/constants';
import { IPost, Post } from '../models/post.model';
import PostMapper from '../mappers/post.mapper';

export default class PostRepository {
  /**
   * Method to create a new post
   * @param {PostTypes.CreatePostDomain} createPostDomain - the post domain object to create
   * @returns {Promise<PostTypes.PostResponseDomain>} promise which resolves to the new post domain object
   */
  public createPost(createPostDomain: PostTypes.CreatePostDomain): Promise<PostTypes.PostResponseDomain> {
    return new Promise((resolve, reject) => {
      const newPost: HydratedDocument<IPost> = new Post(createPostDomain);
      newPost
        .save()
        .then((post: IPost) => {
          return resolve(PostMapper.IPostToPostResponseDomain(post));
        })
        .catch((err: MongooseError) => {
          // error creating the post
          Logger.error(createLog(ErrorCode.MONGOOSE_ERROR, err.name, err.message));
          return reject(err.message);
        });
    });
  }
}
