import { Router, Request, Response, NextFunction } from "express";
import AuthController from "./auth.controller";
import { LoginValidator, RefreshValidator } from "./auth.validator";
import Authentication from "../../common/middleware/authentication.middleware";

const router = Router();

router.post('/login', LoginValidator(), (req: Request, res: Response, next: NextFunction) => {
    AuthController.login(req, res, next)
});

router.post('/refresh-token', RefreshValidator(), (req: Request, res: Response, next: NextFunction) => {
    AuthController.refreshToken(req, res, next)
});

router.post('/send-otp', (req: Request, res: Response, next: NextFunction) => {
    AuthController.sendOTP(req, res, next)
});

router.post('/check-otp', (req: Request, res: Response, next: NextFunction) => {
    AuthController.checkOTP(req, res, next)
});

const AuthRouter = router;

export default AuthRouter;
