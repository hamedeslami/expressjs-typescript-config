import { Router, Request, Response, NextFunction } from "express";
import { Authentication } from "@common/middleware/authentication.middleware";
import { PermissionValidator, RoleValidator } from "./rbac.validator";
import {
    AssignPermissionToRoleController,
    AssignRoleToUserController,
    CreatePermissionController,
    CreateRoleController,
    DeletePermissionController,
    DeleteRoleController,
    GetAllPermissionsController,
    GetAllRolesController,
    UpdatePermissionController,
    UpdateRoleController
} from "./rbac.controller";


const router = Router();

router.get('/roles', Authentication, (req: Request, res: Response, next: NextFunction) => {
    GetAllRolesController(req, res, next)
});

router.post('/roles/create', Authentication, RoleValidator(), (req: Request, res: Response, next: NextFunction) => {
    CreateRoleController(req, res, next)
});

router.patch('/roles/:id', Authentication, RoleValidator(), (req: Request, res: Response, next: NextFunction) => {
    UpdateRoleController(req, res, next)
});

router.delete('/roles/:id', Authentication, (req: Request, res: Response, next: NextFunction) => {
    DeleteRoleController(req, res, next)
});

router.get('/permissions', Authentication, (req: Request, res: Response, next: NextFunction) => {
    GetAllPermissionsController(req, res, next)
});

router.post('/permissions/create', Authentication, PermissionValidator(), (req: Request, res: Response, next: NextFunction) => {
    CreatePermissionController(req, res, next)
});

router.patch('/permissions/:id', Authentication, PermissionValidator(), (req: Request, res: Response, next: NextFunction) => {
    UpdatePermissionController(req, res, next)
});

router.delete('/permissions/:id', Authentication, (req: Request, res: Response, next: NextFunction) => {
    DeletePermissionController(req, res, next)
});

router.post('/roles/:roleId/permissions', Authentication, (req: Request, res: Response, next: NextFunction) => {
    AssignPermissionToRoleController(req, res, next);
});

router.post('/user/:userId/assign-roles', Authentication, (req: Request, res: Response, next: NextFunction) => {
    AssignRoleToUserController(req, res, next)
});

const RbacRouter = router;

export default RbacRouter;
