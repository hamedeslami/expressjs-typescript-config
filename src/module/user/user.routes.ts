import { Router, Request, Response, NextFunction } from "express";
import UserController from "./user.controller";
import { CreateUserValidator } from "./user.validator";

const router = Router();

router.post('/create', CreateUserValidator(), (req: Request, res: Response, next: NextFunction) => {
    UserController.create(req, res, next)
});


const UserRouter = router;

export default UserRouter;
