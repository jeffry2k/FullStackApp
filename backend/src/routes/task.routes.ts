import { Request, Response, NextFunction } from 'express'
import {Router} from 'express';
import authJwt from "../middlewares/authJwt";
import { getTasks, getTask, createTask, updateTask, deleteTask} from "../contollers/task.controller";

const router: Router = Router();

router.use(function(req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/all/:id", [authJwt.verifyToken], getTasks);

router.get("/getTask/:id", [authJwt.verifyToken], getTask);

router.post("/create", [authJwt.verifyToken], createTask);

router.put("/update/:id", [authJwt.verifyToken], updateTask);

router.delete("/delete/:id", [authJwt.verifyToken], deleteTask);

export default router;
