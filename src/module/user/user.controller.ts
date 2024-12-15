import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import UserServices from "./user.services";
import UserMessage from "./user.message";

class UserController {
    #service;

    constructor() {
        this.#service = UserServices;
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const allErrors = errors?.mapped();
                return res.status(400).json({
                    statusCode: 400,
                    message: UserMessage.fieldValidation,
                    data: allErrors
                });
            }

            const result = await this.#service.create(req.body);
            if (result) {
                res.status(200).json({
                    statusCode: 200,
                    message: UserMessage.createUserSuccess,
                    data: result
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();