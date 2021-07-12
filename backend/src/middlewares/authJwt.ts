import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';

export interface IPayload {
  _id: string;
  iat: number;
} 

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('x-access-token');
    if (!token) return res.status(401).json('Access Denied');
    const payload = jwt.verify(token, process.env.token_secret || '') as IPayload;
    req.userId = payload._id;
    next();
  } catch (e) {
      res.status(400).send('Invalid Token');
  }  
};

const authJwt = {
  verifyToken
};

export default authJwt;
