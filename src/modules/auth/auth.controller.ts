import { Request, Response, NextFunction } from "express";
import AuthServices from "./auth.services";
import { validationResult } from "express-validator";
import AuthMessage from "./auth.message";
import { formattedErrors } from "../../utils/errorsFormatter";
import { sendResponse } from "../../utils/responseFormatter";

class AuthController {
  #service;

  constructor() {
    this.#service = AuthServices;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const allErrors = errors?.mapped();
        const mapedError = formattedErrors(allErrors);

        return sendResponse(
          res,
          401,
          AuthMessage.fieldValidation,
          "AUTHORIZED_ERROR",
          []
        );
      }

      const result = await this.#service.login(
        req.body.username,
        req.body.password
      );
      result && sendResponse(res, 200, AuthMessage.loginSuccess, "", result);
    } catch (error) {
      next(error);
    }
  }

  async sendOTP(req: Request, res: Response, next: NextFunction) {
    try {
      // Replace the following with actual logic for sending OTP
      // const result = await this.service.sendOTP(req.body.phoneNumber);
      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      // Handle specific error types if needed
      console.error("Error in sendOTP:", error);
      next(error);
    }
  }

  async checkOTP(req: Request, res: Response, next: NextFunction) {
    try {
      // Replace the following with actual logic for checking OTP
      // const result = await this.service.checkOTP(req.body.phoneNumber, req.body.code);
      res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      // Handle specific error types if needed
      console.error("Error in checkOTP:", error);
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const allErrors = errors?.mapped();
        const mapedError = formattedErrors(allErrors);
        return sendResponse(
          res,
          400,
          AuthMessage.fieldValidation,
          "VALIDATION_ERROR",
          mapedError
        );
      }

      const refreshToken = req.body.refreshToken;

      const result = await this.#service.verifyRefreshToken(refreshToken);

      result &&
        sendResponse(
          res,
          200,
          AuthMessage.createRefreshTokenSuccess,
          "",
          result
        );
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
