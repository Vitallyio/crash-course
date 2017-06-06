import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import Base from './models/Base';

// Import API Endpoints
import registerMovieRouter from './routers/Movie';

export default class App {
  public app: express.Application;
  public apiRouter: express.Router;
  private port: number;

  constructor(port: number, knexConfig: any) {
    this.port = port;

    // Initialize objection models with database connection
    Base.init(knexConfig);

    this.app = express();
    this.apiRouter = express.Router();

    this.app.set('port', port);

    // Apply Middleware
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    this.app.use(cors({
      origin: /localhost.*/,
      methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));

    this.registerApiRoutes([
      registerMovieRouter
    ]);

    this.app.use('/v1', this.apiRouter);

    this.app.get('*', (req: express.Request, res: express.Response) => {
      // Last route, so if we get here, it's a 404
      res.status(404).json({ error: 'API not defined for this route.' });
    });
  }

  registerApiRoutes(routes: Array<Function>) {
    routes.forEach((registerRoute) => registerRoute(this.apiRouter));
  }

  listen(callback?: Function) {
    return callback ? this.app.listen(this.port, callback) : this.app.listen(this.port);
  }

  async shutdown() {
    return Base.close();
  }
}
