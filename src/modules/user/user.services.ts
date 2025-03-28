import { UserModel } from "./user.model";
import createHttpError from "http-errors";
import UserMessage from "./user.message";
import { UserTypes } from "./user.types";
import { hashPassword } from "@utils/passwordHasher";


export const createUser = async (data: UserTypes) => {
    const isUser = await UserModel.findOne({ where: { mobile: data.mobile }, raw: true });
    if (!isUser) {
        const password = hashPassword(data.password);
        const result = await UserModel.create({
            firstname: data.firstname,
            lastname: data.lastname,
            mobile: data.mobile,
            password: password,
            active: data.active,
            level: data.level
        });

        return result;
    }
    throw new createHttpError.BadRequest(UserMessage.USER_EXIST);
};