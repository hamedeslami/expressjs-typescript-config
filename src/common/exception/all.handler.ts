import { Application, Request, Response, NextFunction } from 'express';

export default function AllExceptionHandler(app: Application): void {
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        let status = err?.status ?? err.statusCode ?? err.code;
        if (!status || isNaN(status) || status > 511 || status < 200) {
            status = 500;
        }
        res.status(status).json({
            status: "error",
            statusCode: status,
            message: err?.message || err?.stack || "internal error",
            data: [],
            errorCode: status < 500 ? "SOMETHING_WRONG" : "INTERNAL_ERROR",
            timestamp: new Date().toISOString(),
        });
    });
}
