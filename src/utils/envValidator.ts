import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
    cleanEnv(process.env, {
        NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
        PORT: port({ default: 3000 }),
        DIRECTUS_URL: str(),
        DIRECTUS_TOKEN: str()
    });
};

export default validateEnv;
