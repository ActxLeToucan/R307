import { type NextFunction, type Request, type Response } from 'express';

import { HttpException } from '@/exceptions/HttpException';
import RedirectionService from '@/services/redirection.service';

class RedirectionController {
    private readonly service = new RedirectionService();

    public getRedirection = (req: Request, res: Response, next: NextFunction) => {
        const { path } = req.params;

        this.service.getRedirection(path).then(redirection => {
            if (redirection == null) throw new HttpException(404, 'Redirection not found', 'Redirection not found');
            if (typeof redirection.url !== 'string') throw new HttpException(500, 'Trying to redirect to an invalid URL', 'Trying to redirect to an invalid URL');

            res.redirect(redirection.type, redirection.url);
        }).catch(next);
    };
}

export default RedirectionController;
