import { Application, Request, Response, NextFunction } from 'express';

export default function NotFoundHandler(app: Application) {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404).json({
            status: "error",
            statusCode: 404,
            message: "called wrong address",
            data: [],
            errorCode: "NOT_FOUND",
            timestamp: new Date().toISOString(),
        });
    });
}
