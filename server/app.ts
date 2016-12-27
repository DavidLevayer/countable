import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';

import { pingRouter } from './routes/ping/ping.router';

const app: express.Application = express();

app.disable('x-powered-by');

app.use(json());
app.use(urlencoded({ extended: false }));

// api routes
app.use('/api/v1', pingRouter);

if (app.get('env') === 'production') {

  // in production mode run application from dist folder
  app.use(express.static(path.join(__dirname, '/../client')));
}

// catch 404 and forward to error handler
app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
  let err = new Error('Not Found');
  res.status(404);
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {

  res.status(res.statusCode || 500);
  res.json({
    error: {},
    message: err.message
  });
});

export { app }
