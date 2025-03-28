import { Router, Request, Response, NextFunction } from "express";
import { LoginValidator, RefreshValidator } from "./auth.validator";
import { LoginController, RefreshTokenController } from "./auth.controller";

const router = Router();

router.post('/login', LoginValidator(), (req: Request, res: Response, next: NextFunction) => {
    LoginController(req, res, next)
});

router.post('/refresh-token', RefreshValidator(), (req: Request, res: Response, next: NextFunction) => {
    RefreshTokenController(req, res, next)
});

const AuthRouter = router;

export default AuthRouter;
