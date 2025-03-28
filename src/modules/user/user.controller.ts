import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { createUser } from "./user.services";
import UserMessage from "./user.message";

export const CreateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                message: UserMessage.FIELD_VALIDATION,
                data: null,
            });
        }

        const { firstname, lastname,  mobile, password, active, level} = req.body;
        const user = await createUser({
            firstname,
            lastname,
            mobile,
            password,
            active,
            level
        });

        return res.status(200).json({
            status: 200,
            message: UserMessage.CREATE_USER_SUCCESS,
            data: user,
        });
    } catch (error) {
        next(error)
    }
}
