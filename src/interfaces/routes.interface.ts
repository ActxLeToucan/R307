import { type Router } from 'express';
import { type Tag } from 'swagger-jsdoc';

export interface Routes {
    path?: string
    router: Router
    tag?: Tag
}
