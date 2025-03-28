import { Application, Request, Response, NextFunction } from 'express';

export default function NotFoundHandler(app: Application) {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404).json({
            status: 404,
            message: "not found, called wrong address!",
            data: null,
        });
    });
}