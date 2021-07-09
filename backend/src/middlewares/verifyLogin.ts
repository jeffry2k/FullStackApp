import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
//const ROLES: any = ["user", "admin", "moderator"];

export const checkDuplicateUsernameOrEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({username: req.body.username});
    if (user) return res.status(400).send({ message: "Failed! Username is already in use!" });
    const email = await User.findOne({email: req.body.email});
    if (email) return res.status(400).send({ message: "Failed! Email is already in use!" });
    next();
  } catch (err) {
      res.status(500).send(err);
  }   
};

// export const checkRolesExisted = (req: Request, res: Response, next: NextFunction) => {
//   const roles = Object.values(req.body.roles);
//   roles.forEach(function(rol) {
//     if (!ROLES.includes(rol)) {
//       res.status(400).json(`Failed! Role ${req.body.roles} does not exist!`);
//       return;
//     }
//   }); 
//   next();
// };

export const verifySignUp = {
  checkDuplicateUsernameOrEmail/*,
  checkRolesExisted*/
};

export default verifySignUp;

//module.exports = verifySignUp;