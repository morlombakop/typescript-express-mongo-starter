import { Application, Request, Response } from 'express'; // can we import only what we need?
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import path from 'path';
import ejs from 'ejs';

// import { env } from '../env';

export const staticPageLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined
) => {
  if (settings) {
    const expressApp: Application = settings.getData('express_app');

    expressApp.set('views', path.join(__dirname, '../public/views'));
    expressApp.engine('html', ejs.renderFile);
    expressApp.set('view engine', 'html');

    expressApp.get('/', (req: Request, res: Response) => {
      return res.render('index.html');
    });

    expressApp.get('/about', (req: Request, res: Response) => {
      return res.render('about.html');
    });
  }
};
