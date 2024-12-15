import { Router } from 'express';
import AuthRouter from './module/auth/auth.routes';
import UserRouter from './module/user/user.routes';

const mainRouter = Router();

mainRouter.use('/auth', AuthRouter);
mainRouter.use('/user', UserRouter)

export default mainRouter;
