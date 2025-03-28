import { Router, Request, Response, NextFunction } from "express";
import { CreateUserController } from "./user.controller";
import { CreateUserValidator } from "./user.validator";

const router = Router();

router.post('/create',CreateUserValidator(), (req: Request, res: Response, next: NextFunction) => {
    CreateUserController(req, res, next)
});


const UserRouter = router;

export default UserRouter;
