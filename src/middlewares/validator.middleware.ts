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

import { type NextFunction, type Request, type Response } from 'express';
import { ValidationError } from 'joi';

import { HttpException } from '@/exceptions/HttpException';
import { type IValidator } from '@/interfaces/validator.interface';

const validate = (validator: IValidator) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const data = validator.location === 'body' ? req.body : validator.location === 'params' ? req.params : req.query;
        validator.joiSchema.validateAsync(data, { errors: { wrap: { label: '\'' } } }).then((validatedData) => {
            req[validator.location] = validatedData;
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
