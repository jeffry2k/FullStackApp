import { Request, Response, NextFunction } from 'express'
import {Router} from 'express';
import authJwt from "../middlewares/authJwt";
import { allAccess, userBoard} from "../contollers/user.controller";

const router: Router = Router();

router.use(function(req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/all", allAccess);

router.get("/user", [authJwt.verifyToken], userBoard);

// router.get(
//   "/api/test/mod",
//   [authJwt.verifyToken, authJwt.isModerator],
//   moderatorBoard
// );

// router.get(
//   "/api/test/admin",
//   [authJwt.verifyToken, authJwt.isAdmin],
//   adminBoard
// );

export default router;

