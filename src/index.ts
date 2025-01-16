import express from "express";
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import SwaggerConfig from './config/swagger.config';
import mainRouter from './app.routes';
import NotFoundHandler from './common/exception/notfound.handler';
import AllExceptionHandler from './common/exception/all.handler';
import fs from "fs";
import path from 'path';
import {createStream} from 'rotating-file-stream';
import "./config/redis.config";

// Load environment variables from .env file
dotenv.config();

// create a write stream (in append mode)
const logDirectory = ('./src/logs') ;
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

const accessLogStream = createStream('access.log', {
    interval: '1d',
    path: logDirectory
});


async function main(): Promise<void>{
    const app = express();
    const port = parseInt(process.env.PORT || '3000', 10);

    // Use Helmet for security
    app.use(helmet());
    app.disable('x-powered-by');

    // Configure Swagger
    SwaggerConfig(app);

    // Middleware for JSON and URL-encoded data
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Setup the logger
    app.use(morgan('combined', { stream: accessLogStream }));

    // Use the main router for routing
    app.use(mainRouter);

    // Error handlers
    NotFoundHandler(app);
    AllExceptionHandler(app);

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running at http://127.0.0.1:${port}`);
    });
}

// Run the main function to start the application
main().catch((err) => {
    console.error('Failed to start server:', err);
});