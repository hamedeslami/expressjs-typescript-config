import 'module-alias/register';
import express from "express";
import dotenv from 'dotenv';
import helmet from 'helmet';
import SwaggerConfig from '@config/swagger.config';
import mainRouter from './app.routes';
import NotFoundHandler from '@common/exception/notfound.handler';
import AllExceptionHandler from '@common/exception/all.handler';
import "@config/redis.config";

// Load environment variables from .env file
dotenv.config();

async function main(): Promise<void>{
    const app = express();
    const port = parseInt(process.env.PORT || '3000', 10);

    // Use Helmet for security
    // app.use(helmet());
    // app.disable('x-powered-by');

    // Configure Swagger
    SwaggerConfig(app);

    // Middleware for JSON and URL-encoded data
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Use the main router for routing
    app.use(mainRouter);
    app.use("/uploads", express.static("uploads"));

    // Error handlers
    NotFoundHandler(app);
    AllExceptionHandler(app);

    // Start the server
    app.listen(port, () => {
        console.log(`✅ Server is running at http://127.0.0.1:${port}`);
    });
}

// Run the main function to start the application
main().catch((err) => {
    console.error('❌ Failed to start server:', err);
});