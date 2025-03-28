import { sequelize } from "@config/postgres.config";
import { DataTypes, Model } from "sequelize";
import { PermissionTypes, RoleTypes, RolePermissionTypes, UserRoleModelTypes } from "./rbac.types";
import { UserModel } from "@modules/user/user.model";

const PermissionModel = sequelize.define<Model<PermissionTypes>>("permission", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(90), allowNull: false },
    description: { type: DataTypes.STRING(500), allowNull: true }
}, {
    timestamps: false,
});

const RoleModel = sequelize.define<Model<RoleTypes>>("role", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(90), allowNull: false },
    description: { type: DataTypes.STRING(500), allowNull: true }
}, {
    timestamps: false,
});

const RolePermissionModel = sequelize.define<Model<RolePermissionTypes>>("role_permission", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role_id: { type: DataTypes.INTEGER, allowNull: false },
    permission_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: false,
});

RoleModel.belongsToMany(PermissionModel, {
    through: RolePermissionModel,
    foreignKey: "role_id",
    otherKey: "permission_id",
    // as: "permissions",
});

PermissionModel.belongsToMany(RoleModel, {
    through: RolePermissionModel,
    foreignKey: "permission_id",
    // as: "rolePermissions",
});

const UserRoleModel = sequelize.define<Model<UserRoleModelTypes>>("user_role", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    role_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: false,
});

UserModel.belongsToMany(RoleModel, {
    through: UserRoleModel,
    foreignKey: "user_id",
    otherKey: "role_id",
    // as: "userRoles",
});

RoleModel.belongsToMany(UserModel, {
    through: UserRoleModel,
    foreignKey: "role_id",
    otherKey: "user_id",
    // as: "users"
});


export { RoleModel, PermissionModel, RolePermissionModel, UserRoleModel };
