import { Request, Response } from 'express'
import User, { IUser } from '../models/user.model';

var jwt = require("jsonwebtoken");

export const register = async(req: Request, res: Response) => {  
  console.log(req.body.email);
  const user: IUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  try {
    user.password = await user.encrypPassword(user.password);
    const savedUser = await user.save();
    if (!savedUser) return res.status(404).send({ message: "Error saving user." });
    res.status(200).send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err });
  }  
};

export const login = async (req: Request, res: Response) => {
  const user = await User.findOne({username: req.body.username});
  if(!user) return res.status(404).send({ message: "User Not found." });
  const correctPass: boolean = await user.validatePassword(req.body.password);
  if(!correctPass) return res.status(404).send({ message: "Invalid password." });
  const token: string = jwt.sign({_id: user._id}, process.env.token_secret || 'seguridadtoken', {
      expiresIn: 60 * 60 * 24
  });
  const userData = {
    id: user._id,
    username: user.username,
    email: user.email,
    accessToken: token        
  }
  res.header('x-access-token', token).send(userData);
};

export const logout = (req: Request, res: Response) => {
  req.logout();
  return res.json({ message: "Logout successfully" });
};