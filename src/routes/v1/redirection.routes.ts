import { Router } from 'express';

import { type Routes } from '@/interfaces/routes.interface';
import RedirectionController from '@/controllers/redirection.controller';
import validate from '@/middlewares/validator.middleware';
import { redirectionSchema } from '@/validators/redirection.validator';

class RedirectionRoutes implements Routes {
    public path = '/r';
    public router = Router();
    public tag = {
        name: 'Redirection',
        description: 'Redirection'
    };

    private readonly controller = new RedirectionController();

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes () {
        /**
         * @openapi
         * /r/{path}:
         *   get:
         *     tags:
         *     - Redirection
         *     summary: Get redirection
         *     parameters:
         *     - $ref: '#/components/parameters/path'
         *     responses:
         *       307:
         *         description: Redirect
         *       404:
         *         description: Redirection not found
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Error'
         *       422:
         *         $ref: '#/components/responses/errorValidate'
         *       500:
         *         description: Internal server error
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Error'
         */
        this.router.get(
            `${this.path}/:path`,
            validate(redirectionSchema, 'params'),
            this.controller.getRedirection
        );
    }
}

export default RedirectionRoutes;
