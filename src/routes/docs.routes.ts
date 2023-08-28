import { type Request, type Response, Router } from 'express';
import { type Tag } from 'swagger-jsdoc';
import SwaggerUI from 'swagger-ui-express';

import { type Routes } from '@/interfaces/routes.interface';
import DocGenerator from '@/utils/docGenerator';

class DocsRoutes implements Routes {
    public path = '/docs';
    public router = Router();

    constructor (
        public version: string,
        public folder: string,
        public tags: Tag[] = []
    ) {
        this.initializeRoutes();
    }

    private initializeRoutes () {
        const documentation = DocGenerator(this.version, this.folder, this.tags);

        /**
         * @openapi
         * /{version}/docs:
         *   get:
         *     summary: Get the documentation of the API
         *     tags:
         *     - Documentation
         *     parameters:
         *     - in: path
         *       name: version
         *       description: The version of the API
         *       required: true
         *       schema:
         *         type: string
         *         enum: [v1]
         *         example: v1
         *     responses:
         *       200:
         *         description: Documentation as an HTML page
         */
        this.router.use(`${this.path}`, SwaggerUI.serve, SwaggerUI.setup(documentation, {
            customCss: '.swagger-ui .topbar { display: none }',
            customSiteTitle: `API ${this.version} - Documentation`,
            customfavIcon: '/favicon.ico'
        }));

        /**
         * @openapi
         * /{version}/docs.json:
         *   get:
         *     summary: Get the documentation of the API (JSON)
         *     tags:
         *     - Documentation
         *     parameters:
         *     - in: path
         *       name: version
         *       description: The version of the API
         *       required: true
         *       schema:
         *         type: string
         *         enum: [v1]
         *         example: v1
         *     responses:
         *       200:
         *         description: Documentation as an OpenAPI JSON file
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         */
        this.router.get(`${this.path}.json`, (req: Request, res: Response) => res.json(documentation));
    }
}

export default DocsRoutes;
