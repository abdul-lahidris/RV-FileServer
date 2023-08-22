// authorizationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../models/User';
import { jwtSecret } from '../config/config.json';

export const authorize = (requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get token from headers
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      // Verify token
      const decoded: any = jwt.verify(token, jwtSecret);

      // Get user from the database
      const userRepository = getRepository(User);
      const user = await userRepository.findOne(decoded.userId);

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Check if user's role matches the required role
      if (!requiredRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Unauthorized Access' });
      }

      // Attach user to the request for further use
      req.body.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};
