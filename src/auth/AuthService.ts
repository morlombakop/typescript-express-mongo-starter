import * as express from 'express';
import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../decorators/Logger';
import { decryptJwt, IJwtData } from '../lib/jwt';
import { IUser } from '../api/types/User';
import { UserRepository } from '../api/repositories/UserRepository';

@Service()
export class AuthService {
    constructor(
        @Logger(__filename) private log: LoggerInterface,
        private userRepository: UserRepository
    ) { }

    public parseBasicAuthFromRequest(req: express.Request): IJwtData {
        const authorization = req.header('authorization');

        if (authorization && authorization.split(' ')[0] === 'Bearer ') {
            return decryptJwt(authorization.split(' ')[1]);
        }

        this.log.info('No credentials provided by the client');
        return undefined;
    }

    public validateUser(username: string, password: string): IUser {
        return this.userRepository.findByUsernameAndPassword(username, password);
    }
}
