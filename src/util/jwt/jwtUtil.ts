import jwt from 'jsonwebtoken';

import { Logger } from '../logger';
import { env } from '../../env';

const log = new Logger(__filename);

export interface IJwtData {
  userId: string;
  roles?: string[];
}

export const generateJwt = (data: IJwtData) =>
  jwt.sign(data, env.app.jwt.secret, { expiresIn: env.app.jwt.expiresIn });

export const decryptJwt = (token: string) => {
  let decoded = undefined;
  try {
    decoded = jwt.verify(token, env.app.jwt.secret);
  } catch (ex) {
    log.info('Unable to decrypt this token: ', token, ex);
  }

  return decoded as IJwtData;
};
