/**
 * @openapi
 * components:
 *   responses:
 *     errorValidate:
 *       description: Unprocessable Entity
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 */

import { type ObjectSchema, ValidationError } from 'joi';
import { type NextFunction, type Request, type Response } from 'express';

import { HttpException } from '@/exceptions/HttpException';

const validate = (validator: ObjectSchema, property: 'body' | 'params' | 'query') => {
    return (req: Request, res: Response, next: NextFunction) => {
        const data = property === 'body' ? req.body : property === 'params' ? req.params : req.query;
        validator.validateAsync(data, { errors: { wrap: { label: "'" } } }).then((validatedData) => {
            req[property] = validatedData;
            next();
        }).catch(error => {
            next(error instanceof ValidationError
                ? new HttpException(422, error.message, error.message)
                : error instanceof Error
                    ? new HttpException(500, error.message, error.message)
                    : new HttpException(500, 'Something went wrong', 'Something went wrong'));
        });
    };
};

export default validate;
