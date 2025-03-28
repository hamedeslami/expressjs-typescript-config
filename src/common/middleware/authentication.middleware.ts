import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import dotenv from 'dotenv';
import MiddlewareMessages from './messages';

dotenv.config();

export interface AuthenticationRequest extends Request {
    user?: object
}

export async function Authentication(req: AuthenticationRequest, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;
        if (!token) return next(createHttpError.Unauthorized(MiddlewareMessages.UNAUTHORIZED));

        const PrivateKey = process.env.API_PRIVATE_KEY;
        if (!PrivateKey) return next(createHttpError.InternalServerError(MiddlewareMessages.FIELD_PRIVATE_KEY));

        const parts = token.split(' ');

        if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
            return next(createHttpError.Unauthorized(MiddlewareMessages.TOKEN_INVALID));
        }

        const credentials = parts[1];
        const decoded = jwt.verify(credentials, PrivateKey);

        if (decoded && typeof decoded === 'object') {
            req.user = decoded;
            return next();
        }
        return next(createHttpError.Unauthorized(MiddlewareMessages.TOKEN_INVALID));
    } catch (error: any) {
        return next(createHttpError.Unauthorized(error.message));
    }
}