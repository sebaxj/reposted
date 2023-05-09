namespace PostTypes {
  /**
   * CreatePostDto
   */
  interface CreatePostDto {
    userId: string;
    url?: string | null;
    source?: 'twitter' | 'instagram' | null;
  }

  /**
   * CreatePostDomain
   */
  interface CreatePostDomain {
    userId: string;
    url: string;
    source: 'twitter' | 'instagram';
  }

  /**
   * PostResponseDomain
   */
  interface PostResponseDomain {
    _id: string;
    userId: string;
    url: string;
    source: 'twitter' | 'instagram';
    createdAt: Date;
  }

  /**
   * PostResponseDto
   */
  interface PostResponseDto extends PostResponseDomain {}
}
