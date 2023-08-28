import swaggerJsdoc, { type Tag } from 'swagger-jsdoc';

function generateDoc (version: string, folder: string, tags: Tag[]) {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'R307',
                version
            },
            tags: [
                {
                    name: 'default',
                    description: 'Default routes'
                },
                {
                    name: 'Documentation',
                    description: 'Documentation routes'
                },
                ...tags
            ]
        },
        apis: [
            './src/routes/*.routes.ts',
            `./src/routes/${folder}/*.ts`,
            './src/interfaces/*.ts',
            './src/middlewares/*.ts',
            './src/utils/*.ts',
            './src/validators/*.ts'
        ]
    };

    return swaggerJsdoc(options);
}

export default generateDoc;
