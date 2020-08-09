import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes';
import '../database';

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use(morgan('dev'));
    }

    routes() {
        this.server.use(routes);
    }

    listen(port) {
        this.server.listen(port);
    }
}

export default new App();
