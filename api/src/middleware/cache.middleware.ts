import { NextFunction, Request, Response } from 'express';
import { CACHE_PERIOD } from '../utils/constants';

/**
 * Middleware for setting cache control header
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void} none
 */
export default function setCache(req: Request, res: Response, next: NextFunction): void {
  // only cache GET requests
  if (req.method === 'GET') {
    res.setHeader('Cache-Control', `public, max-age=${CACHE_PERIOD}`);
  } else {
    res.setHeader('Cache-Control', 'no-store');
  }
  next();
}
