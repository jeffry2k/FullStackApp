import {Router} from 'express';
import { Request, Response, NextFunction } from 'express'
import verifyLogin from  "../middlewares/verifyLogin";
import { login, register, logout } from "../contollers/auth.controller";

const router: Router = Router();

router.use(function(req: Request, res: Response, next: NextFunction) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

router.post(
    "/register",
    [
      verifyLogin.checkDuplicateUsernameOrEmail
    ],
    register
  );

  router.post("/login", login);

export default router;