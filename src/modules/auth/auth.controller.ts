import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import AuthMessage from "./auth.message";
import { login, verifyRefreshToken } from "./auth.services";

export const LoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: AuthMessage.FIELD_VALIDATION,
        data: null,
      });
    }

    const { username, password } = req.body;

    const result = await login(username, password);

    if(result){
      return res.status(200).json({
        status: 200,
        message: AuthMessage.LOGIN_SUCCESS,
        data: result,
      });
    }

  } catch (error) {
    next(error);
  }
};

export const RefreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: AuthMessage.FIELD_VALIDATION,
        data: null,
      });
    }

    const { refreshToken } = req.body;

    const result = await verifyRefreshToken(refreshToken);
    if(result){
      return res.status(200).json({
        status: 200,
        message: AuthMessage.CREATE_REFRESH_TOKEN_SUCCESS,
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};
