/*
 * This file contains the functions for the 'index' endpoint.
 * These are used in 'index.router.ts' for the corresponsing functions
 * to each CRUD request.
 */
import { Request, Response } from 'express';
import { response } from '../types/responseDto.interface';
import { HttpStatus } from '../utils/constants';

//--------
// Healthcheck
//--------
export const healthCheck = (req: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    return res.status(HttpStatus.OK).json(response(healthcheck, null, null));
  } catch (err: unknown) {
    healthcheck.message = err as string;
    res.status(HttpStatus.SERVER_UNAVAILABLE).json(response(null, healthcheck, null));
  }
};
