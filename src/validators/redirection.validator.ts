import Joi from 'joi';

export const redirectionSchema = Joi.object({
    path: Joi.string().required()
});
