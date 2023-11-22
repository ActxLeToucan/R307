import Joi from 'joi';

import { type IValidator } from '@/interfaces/validator.interface';

/**
 * @openapi
 * components:
 *   parameters:
 *     path:
 *       in: path
 *       name: path
 *       required: true
 *       schema:
 *         type: string
 */
export const redirectionSchema: IValidator = {
    joiSchema: Joi.object({
        path: Joi.string().required()
    }),
    location: 'params'
};
