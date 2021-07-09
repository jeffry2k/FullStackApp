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

// export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await User.findById(req.userId);
//     if (!user) return res.status(400).json('User not found');
//     const roles = await Role.find({_id: { $in: user.roles }});
//     for (let i = 0; i < roles.length; i++) {
//       if (roles[i].name === "admin") {
//         next();
//         return;
//       }
//     }    
//     res.status(403).send({ message: "Require Admin Role!" });
//     return;    
//   } catch (err) {
//     res.status(400).send(err);
//   }
// };

// export const isModerator = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await User.findById(req.userId);
//     if (!user) return res.status(400).json('User not found');
//     const roles = await Role.find({_id: { $in: user.roles }});
//     for (let i = 0; i < roles.length; i++) {
//       if (roles[i].name === "moderator") {
//         next();
//         return;
//       }
//     }    
//     res.status(403).send({ message: "Require Moderator Role!" });
//     return;    
//   } catch (err) {
//     res.status(400).send(err);
//   }
// };

const authJwt = {
  verifyToken
};

export default authJwt;
