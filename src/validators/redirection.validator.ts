import Joi from 'joi';

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
export const redirectionSchema = Joi.object({
    path: Joi.string().required()
});
