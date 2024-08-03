// src/middleware/auth.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string

declare module 'express-serve-static-core' {
  interface Request {
    userId?: number;
    role?: string;
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ status: false, message: 'Please provide a token for authentication' });
    }

    const decodedToken = jwt.verify(token, secret) as jwt.JwtPayload;

    if (decodedToken.exp && decodedToken.exp < Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ status: false, message: 'Token has expired' });
    }

    req.userId = decodedToken.userId;
    req.role = decodedToken.role;
    next();
  } catch (error) {
    return res.status(500).json({ status: false, message: 'Invalid token' });
  }
};

export const authorizeByUserId = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    const paramUserId = parseInt(req.params.userId, 10);

    if (!userId || userId !== paramUserId) {
      return res.status(403).json({ status: false, message: 'You are not authorized to access this resource' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ status: false, message: 'Authorization error' });
  }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.role !== 'superadmin') {
      return res.status(403).json({ status: false, message: 'You are not authorized to access this resource' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ status: false, message: 'Authorization error' });
  }
};

export default { authenticate, authorizeByUserId, authorizeAdmin };
