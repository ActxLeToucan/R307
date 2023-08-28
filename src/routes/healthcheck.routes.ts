import { type Request, type Response, Router } from 'express';

import { type Routes } from '@/interfaces/routes.interface';

class HealthcheckRoutes implements Routes {
    public path = '/healthcheck';
    public router = Router();

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes () {
        /**
         * @openapi
         * /healthcheck:
         *   get:
         *     summary: Get the healthcheck of the API
         *     responses:
         *       '200':
         *         description: The API is up and running
         *         content:
         *           text/plain:
         *             example: OK
         */
        this.router.get(`${this.path}`, (req: Request, res: Response) => res.sendStatus(200));
    }
}

export default HealthcheckRoutes;
