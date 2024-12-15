import { Application } from 'express';
import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export default function SwaggerConfig(app: Application) {
    const options: Options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Express Backend Api',
                version: '0.0.1',
            },
        },
        apis: ['./src/module/**/*.swagger.ts'],
    };

    const swaggerDocument = swaggerJsdoc(options);
    const swaggerSetup = swaggerUi.setup(swaggerDocument);

    app.use('/api-docs', swaggerUi.serve, swaggerSetup);
}
