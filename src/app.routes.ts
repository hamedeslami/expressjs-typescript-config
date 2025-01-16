import { Router } from 'express';
import AuthRouter from './modules/auth/auth.routes';
import UserRouter from './modules/user/user.routes';

const mainRouter = Router();

mainRouter.use('/auth', AuthRouter);
mainRouter.use('/user', UserRouter)

export default mainRouter;
