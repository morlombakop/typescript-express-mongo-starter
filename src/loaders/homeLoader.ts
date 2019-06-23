import * as express from 'express'; // can we import only what we need?
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';

// import { env } from '../env';

export const homeLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined
) => {
  if (settings) {
    const expressApp: express.Application = settings.getData('express_app');


    app.set('views', path.join(__dirname, 'public/views'));
    app.engine('html', ejs.renderFile);
    app.set('view engine', 'html');

    expressApp.get('/', (req: express.Request, res: express.Response) => {
      return res.render('index.html');
    });
  }
};
