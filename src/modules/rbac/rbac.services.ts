import createHttpError from "http-errors";
import {
    PermissionModel,
    RoleModel,
    RolePermissionModel,
    UserRoleModel,
} from "./rbac.model";
import { PermissionTypes, RoleTypes } from "./rbac.types";
import { UserModel } from "@modules/user/user.model";
import RbacMessage from "./rbac.messages";

export const getAllRoles = async () => {
    const result = await RoleModel.findAll();
    return result;
};

export const findRoleTitle = async (name: string) => {
    const result = await RoleModel.findOne({ where: { name } });
    return result;
};

export const findPermissionTitle = async (name: string) => {
    const result = await PermissionModel.findOne({ where: { name } });
    return result;
};

export const createRole = async (data: RoleTypes) => {
    const result = await RoleModel.create({
        name: data.name,
        description: data.description,
    });

    return result;
};

export const updateRole = async (id: string, data: RoleTypes) => {
    const role = await RoleModel.findByPk(id);
    if (!role) throw createHttpError(404, RbacMessage.ROLE_NOT_FOUND);

    await role.update(data);
    return data;
};

export const deleteRole = async (id: string) => {
    const role = await RoleModel.findByPk(id);
    if (!role) throw createHttpError(404, RbacMessage.ROLE_NOT_FOUND);

    await role.destroy();
    return [];
};

export const getAllPermissions = async () => {
    const result = await PermissionModel.findAll();
    return result;
};

export const createPermission = async (data: PermissionTypes) => {
    const result = await PermissionModel.create({
        name: data.name,
        description: data.description,
    });

    return result;
};

export const updatePermission = async (
    id: string,
    data: PermissionTypes
) => {
    const permission = await PermissionModel.findByPk(id);
    if (!permission) throw createHttpError(404, RbacMessage.PERMISSION_NOT_FOUND);

    await permission.update(data);
    return data;
};

export const deletePermission = async (id: string) => {
    const permission = await PermissionModel.findByPk(id);
    if (!permission) throw createHttpError(404, RbacMessage.PERMISSION_NOT_FOUND);

    await permission.destroy();
    return [];
};

export const assignPermissionsToRole = async (
    roleId: number,
    permissionIds: number[]
) => {
    const role = await RoleModel.findByPk(roleId);
    if (!role) throw new Error(RbacMessage.ROLE_NOT_FOUND);

    await RolePermissionModel.destroy({
        where: { role_id: roleId },
    });

    const permissions = await PermissionModel.findAll({
        where: { id: permissionIds },
    });

    if (permissions.length !== permissionIds.length) {
        throw new Error(RbacMessage.SOME_PERMISSION_NOT_FOUND);
    }

    const newPermissions = permissionIds.map((permissionId) => ({
        role_id: roleId,
        permission_id: permissionId,
    }));

    await RolePermissionModel.bulkCreate(newPermissions);

    return role;
};

export const assignRoleToUser = async (userId: number, roleIds: number[]) => {
    const user = await UserModel.findByPk(userId, {
        attributes: ["id", "firstname", "lastname"],
    });
    if (!user) {
        throw new Error("User not found");
    }

    const roles = await RoleModel.findAll({ where: { id: roleIds } });
    if (roles.length !== roleIds.length) {
        throw new Error(RbacMessage.SOME_ROLE_NOT_FOUND);
    }

    await UserRoleModel.destroy({
        where: { user_id: userId },
    });

    const newRoles = roleIds.map((roleId) => ({
        user_id: userId,
        role_id: roleId,
    }));

    await UserRoleModel.bulkCreate(newRoles);
    return { user, roles };
};