import { PermissionTypes, RoleTypes } from "@modules/rbac/rbac.types";

export interface UserTypes {
    id?: number;
    firstname: string;
    lastname: string;
    mobile: string;
    password: string;
    active?: boolean,
    roles?: RoleTypes[];
    permissions?: PermissionTypes[];
    level: string
}