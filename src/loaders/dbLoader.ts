import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import mongoose from 'mongoose';

import { env } from '../env';
import { Logger } from '../lib/logger';

export const dbLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
  if (settings) {
    mongoose.Promise = global.Promise;
    const log = new Logger(__filename);
    let connectionAttempts = 4;

    const attemptMongoConnect = () =>
      mongoose.connect(`mongodb://${env.db.url}/${env.db.name}`, {
        useNewUrlParser: true,
      });
    const db = mongoose.connection;

    db.on('error', () => {
      if (connectionAttempts > 0) {
        log.error(
          `Unable to connect to ${env.db.url}, attempting ${connectionAttempts} more times`
        );
        connectionAttempts--;
        setTimeout(attemptMongoConnect, 5000);
      } else {
        log.error(`Unable to connect to mongodb at ${env.db.url}, shutting down the application`);
        process.exit(1);
      }
    });

    db.once('open', () => {
      log.info(`Connected to MongoDB at ${env.db.url}`);
    });

    attemptMongoConnect();
  }
};
