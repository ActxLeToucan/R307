import dotenv from 'dotenv';
import { cleanEnv, port, str } from 'envalid';

dotenv.config();

const validateEnv = () => {
    // eslint-disable-next-line n/no-process-env
    return cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'test', 'production', 'staging']
        }),
        LOG_DIR: str({ default: '/logs' }),
        LOG_FORMAT: str({ default: 'combined' }),
        ORIGIN: str({ default: '*' }),
        PORT: port({ default: 3000 }),
        DIRECTUS_URL: str(),
        DIRECTUS_TOKEN: str()
    });
};

export default validateEnv;
