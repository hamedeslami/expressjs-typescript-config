import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { verifyPassword } from "@utils/passwordHasher";
import { UserModel } from "@modules/user/user.model";
import { RoleModel } from "@modules/rbac/rbac.model";
import { UserTypes } from "@modules/user/user.types";
import AuthMessage from "./auth.message";

dotenv.config();

export const login = async (username: string, password: string) => {
    const user = (await findUserAndRolesByMobile(username)) as UserTypes | null;
        if (user && user.active && user.password) {
            const result = verifyPassword(password, user.password);
            if (result) {
                const payload = {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    mobile: user.mobile,
                    roles: user.roles
                };
                const token = await createToken(payload);
                if (token) {
                    const refreshToken = await createRefreshToken(payload, user.level);
                    return {
                        accessToken: token,
                        refreshToken: refreshToken,
                        type: "Bearer",
                        expiresIn: 600,
                    };
                }

                throw new createHttpError.Unauthorized(AuthMessage.FIELD_TOKEN);
            }
        }
        throw new createHttpError.Unauthorized(AuthMessage.FIELD_LOGIN);
}

export const findUserByMobile = async (username: string) => {
    const user = await UserModel.findOne({ where: { mobile: username }, raw: true });
        return user;
}


export const findUserAndRolesByMobile = async (mobile: string) => {
    const user = await UserModel.findOne({
        where: { mobile },
        attributes: ["firstname", "lastname", "mobile", "level", "active", "password"],
        include: [
            {
                model: RoleModel,
                as: "roles",
                attributes: ["name"],
                through: { attributes: [] },
            },
        ],
    });

    if (!user) return null;

    const userData = user.toJSON();

    const formattedUser = {
        firstname: userData.firstname,
        lastname: userData.lastname,
        mobile: userData.mobile,
        roles: userData.roles?.map((role: any) => role.name) || [],
        level: userData.level,
        active: userData.active,
        password: userData.password
    };

    return formattedUser;
}


export const createToken = async (payload: Object) => {
    const PrivateKey = process.env.API_PRIVATE_KEY;
        const options = {
            expiresIn: 60 * 10
        }

        if (!PrivateKey) throw new createHttpError.InternalServerError(AuthMessage.FIELD_PRIVATE_KEY);

        const token = jwt.sign(payload, PrivateKey, options);
        if (token) return token;
        throw new createHttpError.InternalServerError(AuthMessage.FIELD_TOKEN);
}

export const createRefreshToken = async (payload: Object, level: string) => {
    const PrivateKey = process.env.API_REFRESH_PRIVATE_KEY;
        const time = level === "user" ? 60 * 60 * 24 : 60 * 60;
        const options = {
            expiresIn: time
        }
        if (!PrivateKey) throw new createHttpError.InternalServerError(AuthMessage.FIELD_PRIVATE_KEY);

        const refreshToken = jwt.sign(payload, PrivateKey, options);
        if (refreshToken) return refreshToken;
        throw new createHttpError.InternalServerError(AuthMessage.FIELD_REFRESH_TOKEN);
}

export const verifyRefreshToken = async (refreshToken: string) => {
    try {
        const PrivateRefreshKey = process.env.API_REFRESH_PRIVATE_KEY;
        if (!PrivateRefreshKey) throw new createHttpError.InternalServerError(AuthMessage.FIELD_PRIVATE_KEY);
        const payload = jwt.verify(refreshToken, PrivateRefreshKey);

        if (payload && typeof payload === 'object') {
            const user = (await findUserAndRolesByMobile(payload.mobile)) as UserTypes | null;

            if (!user || !user.active) throw new createHttpError.Unauthorized(AuthMessage.USER_NOT_FOUND);

            const data = {
                firstname: user.firstname,
                lastname: user.lastname,
                mobile: user.mobile,
                roles: user.roles
            };

            const newToken = createToken(data);
            if (newToken) {
                return {
                    accessToken: newToken,
                    type: "Bearer",
                    expiresIn: 600,
                };
            }
        }
    } catch (error) {
        throw new createHttpError.Unauthorized(AuthMessage.FIELD_REFRESH_TOKEN);
    }
}