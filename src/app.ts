import 'reflect-metadata';
import { bootstrapMicroframework } from 'microframework-w3tec';

import { Logger } from './lib/logger';
import { expressLoader } from './loaders/expressLoader';
import { staticPageLoader } from './loaders/staticPageLoader';
import { monitorLoader } from './loaders/monitorLoader';
import { iocLoader } from './loaders/iocLoader';
import { dbLoader } from './loaders/dbLoader';

const log = new Logger(__filename);

bootstrapMicroframework({
  /**
   * Loader is a place where you can configure all your modules during microframework
   * bootstrap process. All loaders are executed one by one in a sequential order.
   */
  loaders: [iocLoader, expressLoader, dbLoader, staticPageLoader, monitorLoader],
})
  // .then(() => banner(log))
  .catch(error => log.error('Application is crashed: ' + error));
