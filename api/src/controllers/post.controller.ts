//--------
// Create New Post

import { Request, Response } from 'express';
import { HttpStatus } from '../utils/constants';
import { Logger, createLog } from '../utils/logger';
import PostService from '../services/post.service';
import PostMapper from '../mappers/post.mapper';
import { response } from '../types/responseDto.interface';

const postService: PostService = new PostService();

//--------
// Create New Post
//--------
export const createPost = async (req: Request, res: Response) => {
  try {
    // create post
    const postDomain: PostTypes.PostResponseDomain = await postService.createPost(
      PostMapper.createPostDtoToDomain({ userId: req.body.jwt._id, ...req.body }),
    );

    // return OK response
    return res.status(HttpStatus.OK).json(response(PostMapper.postResponseDomainToDto(postDomain), null, null));
  } catch (err: unknown) {
    // log error
    Logger.error(createLog("Can't create post", `${err}`, 'post.controller'));
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response(null, `${err}`, null));
  }
};

//--------
// Get Posts by filter
//--------
export const getPosts = async (req: Request, res: Response) => {
  try {
    // return OK response
    return res.status(HttpStatus.OK).json(response({ query: req.query }, null, null));
  } catch (err: unknown) {
    // log error
    Logger.error(createLog("Can't get posts", `${err}`, 'post.controller'));
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response(null, `${err}`, null));
  }
};
