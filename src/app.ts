import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

import { LOG_FORMAT, NODE_ENV, ORIGIN, PORT } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import errorMiddleware from '@/middlewares/error.middleware';
import HealthcheckRoutes from '@/routes/healthcheck.routes';
import RouterV1 from '@/routes/v1';
import { logger, stream } from '@/utils/logger';

class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    // Construction de l'app Express
    constructor () {
        this.app = express();
        this.env = NODE_ENV;
        this.port = PORT;

        logger.info('Initializing application...');
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    public listen () {
        this.app.listen(this.port, () => {
            logger.info('=================================');
            logger.info(`======= ENV: ${this.env} =======`);
            logger.info(`🚀 App listening on the port ${this.port}`);
            logger.info('=================================');
        });
    }

    /**
     * Initialise les middleware Express
     * @private
     */
    private initializeMiddlewares () {
        // Log des requêtes entrantes
        this.app.use(morgan(LOG_FORMAT, { stream }));
        // Autorisation des cors
        this.app.use(cors({ origin: ORIGIN }));
        // Prévention des attaques polluantes
        this.app.use(hpp());
        // Plugin de sécurité pour Express
        this.app.use(helmet());
        // Compression des réponses
        this.app.use(compression());
        // indique à Express que l'on souhaite parser le body des requêtes en JSON
        this.app.use(express.json());
        // interdit les nested object dans le body des requêtes
        this.app.use(express.urlencoded({ extended: false }));
    }

    /**
     * Initialise les routes de l'application
     * @private
     */
    private initializeRoutes () {
        // Health check: /healthcheck
        this.app.use('/', new HealthcheckRoutes().router);

        // V1 de l'API: /v1
        this.app.use('/', new RouterV1().router);

        // Redirection vers la documentation de la dernière version de l'API
        this.app.get('/', (_, res) => {
            res.redirect('/v1/docs');
        });

        // catch 404 and forward to error handler
        this.app.use((req, res, next) => {
            next(new HttpException(404, 'Route not found', 'Route not found'));
        });
    }

    private initializeErrorHandling () {
        this.app.use(errorMiddleware);
    }
}

export default App;
