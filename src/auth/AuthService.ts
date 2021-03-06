import * as express from 'express';
import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../decorators/Logger';
import { decryptJwt, IJwtData } from '../util/jwt';
import { IUser } from '../api/types/UserType';
import { UserRepository } from '../api/repositories/UserRepository';
import { env } from '../env';

@Service()
export class AuthService {
  constructor(
    @Logger(__dirname) private log: LoggerInterface,
    private userRepository: UserRepository
  ) {}

  public getUserClaimFromRequest(req: express.Request): IJwtData {
    const authorization = req.header('Authorization');

    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      return decryptJwt(authorization.split(' ')[1]);
    }

    this.log.info('No JWT provided by the client');
    return undefined;
  }

  public validateUser(claim: IJwtData, roles: string[]): Promise<IUser | undefined> {
    return this.userRepository
      .findById(claim.userId)
      .then(user =>
        roles.length === 0 || roles.some(role => env.app.user.roles.includes(role))
          ? user
          : undefined
      );
  }
}
