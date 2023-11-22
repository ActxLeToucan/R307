import validateEnv from '@/utils/envValidator';

export const {
    NODE_ENV,
    LOG_DIR,
    LOG_FORMAT,
    ORIGIN,
    PORT,
    DIRECTUS_URL,
    DIRECTUS_TOKEN
} = validateEnv();
