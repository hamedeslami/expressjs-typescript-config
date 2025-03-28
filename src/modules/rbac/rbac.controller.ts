import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import RbacMessage from "./rbac.messages";
import {
    assignPermissionsToRole,
    assignRoleToUser,
    createPermission,
    createRole,
    deletePermission,
    deleteRole,
    getAllPermissions,
    getAllRoles,
    updatePermission,
    updateRole
} from "./rbac.services";
import { delRedis } from "@utils/redisCache";

export const GetAllRolesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = await getAllRoles();
        return res.status(200).json({
            status: 200,
            message: RbacMessage.GET_ALL_ROLE_SSUCCESS,
            data: roles,
        });
    } catch (error) {
        next(error)
    }
}

export const CreateRoleController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                message: RbacMessage.FIELD_VALIDATION,
                data: null,
            });
        }

        const { name, description } = req.body;
        const newRole = await createRole({
            name,
            description,
        });

        return res.status(200).json({
            status: 200,
            message: RbacMessage.CREATE_ROLE_SUCCESS,
            data: newRole,
        });
    } catch (error) {
        next(error)
    }
}

export const UpdateRoleController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                message: RbacMessage.FIELD_VALIDATION,
                data: null,
            });
        }

        const { name, description } = req.body;
        const { id } = req.params;

        const updatedRole = await updateRole(id, { name, description });

        return res.status(200).json({
            status: 200,
            message: RbacMessage.UPDATE_ROLE_SUCCESS,
            data: updatedRole,
        });
    } catch (error) {
        next(error)
    }
}

export const DeleteRoleController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await deleteRole(id);

        return res.status(200).json({
            status: 200,
            message: RbacMessage.DELETE_ROLE_SUCCESS,
            data: result,
        });
    } catch (error) {
        next(error)
    }
}

export const GetAllPermissionsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const permissions = await getAllPermissions();
        return res.status(200).json({
            status: 200,
            message: RbacMessage.GET_ALL_PERMISSION_SSUCCESS,
            data: permissions,
        });
    } catch (error) {
        next(error)
    }
}

export const CreatePermissionController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                message: RbacMessage.FIELD_VALIDATION,
                data: null,
            });
        }

        const { name, description } = req.body;
        const newPermission = await createPermission({
            name,
            description,
        });

        return res.status(200).json({
            status: 200,
            message: RbacMessage.CREATE_PERMISSION_SUCCESS,
            data: newPermission,
        });
    } catch (error) {
        next(error)
    }
}

export const UpdatePermissionController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                message: RbacMessage.FIELD_VALIDATION,
                data: null,
            });
        }

        const { name, description } = req.body;
        const { id } = req.params;

        const updatedPermission = await updatePermission(id, { name, description });

        return res.status(200).json({
            status: 200,
            message: RbacMessage.UPDATE_PERMISSION_SUCCESS,
            data: updatedPermission,
        });
    } catch (error) {
        next(error)
    }
}

export const DeletePermissionController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await deletePermission(id);

        return res.status(200).json({
            status: 200,
            message: RbacMessage.DELETE_PERMISSION_SUCCESS,
            data: result,
        });
    } catch (error) {
        next(error)
    }
}

export const AssignPermissionToRoleController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { permissionIds } = req.body;
        const { roleId } = req.params;

        if (!Array.isArray(permissionIds) || !permissionIds.every(id => typeof id === "number")) {
            return res.status(400).json({
                status: 400,
                message: RbacMessage.INVALID_PERMISSION_IDS,
                data: null,
            });
        }

        const uniqPermissionIds: number[] = [...new Set(permissionIds)];

        const role = await assignPermissionsToRole(parseInt(roleId), uniqPermissionIds);

        const roleName = role.get("name") as string;
        await delRedis(roleName);

        return res.status(200).json({
            status: 200,
            message: RbacMessage.ASSIGNED_PERMISSIONS_SUCCESS,
            data: role,
        });
    } catch (error) {
        next(error);
    }
};

export const AssignRoleToUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roleIds } = req.body;
        const { userId } = req.params;

        if (!Array.isArray(roleIds) || !roleIds.every(id => typeof id === "number")) {
            return res.status(400).json({
                status: 400,
                message: RbacMessage.INVALID_ROLE_IDS,
                data: null,
            });
        }

        const uniqRoleIds = [...new Set(roleIds)];

        const assignedRoles = await assignRoleToUser(parseInt(userId), uniqRoleIds);

        return res.status(200).json({
            status: 200,
            message: RbacMessage.ASSIGNED_ROLES_SUCCESS,
            data: assignedRoles,
        });
    } catch (error) {
        next(error);
    }
};

