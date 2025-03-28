export interface PermissionTypes {
    id?: number;
    name: string;
    description?: string;
}

export interface RoleTypes {
    id?: number;
    name: string;
    description?: string;
}

export interface RolePermissionTypes {
    id?: number;
    role_id: number;
    permission_id: number;
}

export interface UserRoleModelTypes {
    id?: number;
    user_id: number;
    role_id: number;
}