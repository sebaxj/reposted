namespace PostTypes {
  /**
   * CreatePostDto
   */
  interface CreatePostDto {
    userId: string;
    url?: string | null;
    source?: 'twitter' | 'instagram' | null;
    privacy?: 'public' | 'private';
  }

  /**
   * CreatePostDomain
   */
  interface CreatePostDomain extends CreatePostDto {}

  /**
   * PostResponseDomain
   */
  interface PostResponseDomain {
    _id: string;
    userId: string;
    url: string;
    source: 'twitter' | 'instagram';
    privacy: 'public' | 'private';
    createdAt: Date;
  }

  /**
   * PostResponseDto
   */
  interface PostResponseDto extends PostResponseDomain {}
}
