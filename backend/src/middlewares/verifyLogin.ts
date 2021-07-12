import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

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

export const verifySignUp = {
  checkDuplicateUsernameOrEmail
};

export default verifySignUp;