import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import UserServices from "./user.services";
import UserMessage from "./user.message";
import { sendResponse } from "../../utils/responseFormatter";
import { formattedErrors } from "../../utils/errorsFormatter";

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
                const mapedError = formattedErrors(allErrors);

                return sendResponse(
                    res,
                    400,
                    UserMessage.fieldValidation,
                    "VALIDATION_ERROR",
                    mapedError
                );
            }

            const result = await this.#service.create(req.body);
            result &&
                sendResponse(res, 200, UserMessage.createUserSuccess, "", result);
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
