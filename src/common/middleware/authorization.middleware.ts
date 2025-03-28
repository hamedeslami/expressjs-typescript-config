import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import MiddlewareMessages from './messages';
import { PermissionModel, RoleModel } from '@modules/rbac/rbac.model';
import { PermissionTypes, RoleTypes } from '@modules/rbac/rbac.types';
import { getRedis, setRedis } from '@utils/redisCache';

export interface RoleWithPermissions extends RoleTypes {
    permissions: PermissionTypes[];
}

export function Authorization(requiredPermission: string) {
    return async (req: any, res: Response, next: NextFunction) => {
        const user = req.user;

        if (user && typeof user === 'object' && Array.isArray(user.roles)) {
            const roles = user.roles as string[];

            const permissions = await checkPermissionsInRedis(roles);

            if (permissions) {
                if (!requiredPermission || !permissions.includes(requiredPermission.toString())) {
                    return next(createHttpError.Forbidden(MiddlewareMessages.PERMISSION_DENIED));
                }
                return next();
            }

            await fetchAndCachePermissions(roles);

            const cachedPermissions = await checkPermissionsInRedis(roles);
            if (cachedPermissions) {
                if (!requiredPermission || !cachedPermissions.includes(requiredPermission.toString())) {
                    return next(createHttpError.Forbidden(MiddlewareMessages.PERMISSION_DENIED));
                }
                return next();
            }
        }

        return next(createHttpError.Unauthorized(MiddlewareMessages.TOKEN_INVALID));
    };
}


async function checkPermissionsInRedis(roles: string[]) {
    const permissions: string[] = [];

    for (let role of roles) {
        const rolePermissions = await getRedis(role);
        if (rolePermissions) {
            permissions.push(...JSON.parse(rolePermissions));
        }
    }

    return permissions.length > 0 ? permissions : null;
}

async function fetchAndCachePermissions(roles: string[]) {
    for (let role of roles) {
        const roleData = await RoleModel.findOne({
            where: { name: role },
            include: [
                {
                    model: PermissionModel,
                    as: 'permissions',
                    attributes: ['name'],
                },
            ],
            raw: false,
        });


        if (roleData) {
            const plainRoleData = roleData.get() as RoleWithPermissions;

            if (plainRoleData.permissions) {
                const permissions = plainRoleData.permissions.map(
                    (permission: PermissionTypes) => permission.name
                );
                await setRedis(role, JSON.stringify(permissions), 3600);
            }
        }
    }
}