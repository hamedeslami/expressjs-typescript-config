import { Router } from 'express';
import AuthRouter from './modules/auth/auth.routes';
import UserRouter from './modules/user/user.routes';
import RbacRouter from './modules/rbac/rbac.routes';


const mainRouter = Router();

mainRouter.use('/auth', AuthRouter);
mainRouter.use('/user', UserRouter);
mainRouter.use('/rbac', RbacRouter);

export default mainRouter;
