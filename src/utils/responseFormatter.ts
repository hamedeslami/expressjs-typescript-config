import { Response } from "express";

export const sendResponse = (
    res: Response,
    statusCode: number,
    message: string,
    errorCode: string,
    data: any
): Response => {
    return res.status(statusCode).json({
        status: statusCode !== 200 ? "error" : "success",
        statusCode,
        message,
        data,
        errorCode: errorCode.length > 0 ? errorCode : null,
        timestamp: new Date().toISOString(),
    });
};
