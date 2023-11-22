import { type ObjectSchema } from 'joi';

export interface IValidator {
    joiSchema: ObjectSchema;
    location: 'body' | 'params' | 'query';
}
