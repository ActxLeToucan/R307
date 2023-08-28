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
        // TODO: Add swagger documentation
        this.router.get(
            `${this.path}/:path`,
            validate(redirectionSchema, 'params'),
            this.controller.getRedirection
        );
    }
}

export default RedirectionRoutes;
