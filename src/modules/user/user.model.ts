import { DataTypes, Model } from 'sequelize';
import { UserTypes } from './user.types';
import { sequelize } from '@config/postgres.config';
import { PermissionTypes, RoleTypes } from '@modules/rbac/rbac.types';

export interface UserModel extends Model<UserTypes, UserTypes> {
    roles: RoleTypes[];
    permissions: PermissionTypes[];
}

const UserModel = sequelize.define<Model<UserTypes>>("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstname: {type: DataTypes.STRING(90)},
    lastname: {type: DataTypes.STRING(150)},
    mobile: {
        type: DataTypes.STRING(15),
        unique: true,
    },
    password: {type: DataTypes.STRING},
    active: {type: DataTypes.BOOLEAN, defaultValue: true},
    level: {type: DataTypes.STRING},
}, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});


export { UserModel };