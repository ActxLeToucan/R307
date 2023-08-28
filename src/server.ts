import App from '@/app';
import validateEnv from '@/utils/envValidator';

validateEnv();

const app = new App();

app.listen();
