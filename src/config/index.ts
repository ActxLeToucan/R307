export const {
    NODE_ENV,
    PORT,
    ORIGIN,
    DIRECTUS_URL,
    DIRECTUS_TOKEN
} = process.env;

// Logger
export const LOG_DIR = process.env.LOG_DIR ?? '/logs';
export const LOG_FORMAT = process.env.LOG_FORMAT ?? 'combined';
