import { Router } from 'express';
import { type Tag } from 'swagger-jsdoc';

import { type Routes } from '@/interfaces/routes.interface';
import DocsRoutes from '@/routes/docs.routes';
import RedirectionRoutes from '@/routes/v1/redirection.routes';

class RouterV1 implements Routes {
    public path = '/v1';
    public router = Router();
    public version = '1.0.0';

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes () {
        const redirectionRoutes = new RedirectionRoutes();
        this.router.use(`${this.path}`, redirectionRoutes.router);

        const tags: Tag[] = [
            redirectionRoutes.tag
        ];

        this.router.use(`${this.path}`, new DocsRoutes(this.version, 'v1', tags).router);
    }
}

export default RouterV1;
