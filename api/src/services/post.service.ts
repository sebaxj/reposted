import PostRepository from '../repository/post.repository';

export default class PostService {
  postRepository: PostRepository;

  constructor() {
    this.postRepository = new PostRepository();
  }

  /**
   * Method to create a new post
   * @param {PostTypes.CreatePostDomain} createPostDomain
   * @returns {Promise<PostTypes.PostResponseDomain>} promise which resolves to to post domain object
   */
  public createPost(createPostDomain: PostTypes.CreatePostDomain): Promise<PostTypes.PostResponseDomain> {
    return new Promise((resolve, reject) => {
      this.postRepository
        .createPost(createPostDomain)
        .then((post: PostTypes.PostResponseDomain) => {
          return resolve(post);
        })
        .catch((err: unknown) => {
          return reject(err);
        });
    });
  }
}
