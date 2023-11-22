/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *             message:
 *               type: string
 */

import { isAxiosError } from 'axios';
import { type NextFunction, type Request, type Response } from 'express';

import { NODE_ENV } from '@/config';
import { type HttpException } from '@/exceptions/HttpException';
import { logger } from '@/utils/logger';

const GENERIC_ERROR_MESSAGE = 'Something went wrong';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction): void => {
    try {
        let status: number = 500;
        let message: string = GENERIC_ERROR_MESSAGE;
        let publicMessage: string = GENERIC_ERROR_MESSAGE;

        if (isAxiosError(error)) {
            if (error.response != null) {
                // La requête a été exécutée et le serveur cible a répondu avec un code HTTP autre que 2xx
                status = error.response?.status ?? 500;
                message = error.response?.data?.message ?? GENERIC_ERROR_MESSAGE;
                publicMessage = error.response?.data?.publicMessage ?? GENERIC_ERROR_MESSAGE;
            } else if (error.request != null) {
                // La requête a été exécutée, mais aucune réponse n'est revenue
                status = 500;
                message = 'No response from server';
                publicMessage = GENERIC_ERROR_MESSAGE;
            } else {
                next(error);
            }
        } else {
            status = error.status ?? 500;
            message = error.message ?? GENERIC_ERROR_MESSAGE;
            publicMessage = error.publicMessage ?? GENERIC_ERROR_MESSAGE;
        }

        logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
        if (!res.writableEnded) res.status(status).json({
            error: {
                code: status,
                message: NODE_ENV === 'development' ? message : publicMessage
            }
        });
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;
