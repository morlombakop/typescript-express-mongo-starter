import { Service } from 'typedi';

import { User } from '../models/UserModel';
import { IUser } from '../types/User';
import { IUserRepository } from './interfaces/IUserRepository';
import { Logger, LoggerInterface } from '../../decorators/Logger';

@Service()
export class UserRepository implements IUserRepository {
  constructor(@Logger(__filename) private log: LoggerInterface) {}

  public async findById(id: string): Promise<IUser> {
    return User.findById(id)
      .then(result => result.toJSON())
      .catch(err => {
        this.log.error(
          `Unable to find user with id: ${id}, operation failed with this error: ${err}`
        );
        return undefined;
      });
  }

  public async findByUsernameAndPassword(username: string, password: string): Promise<IUser> {
    return User.findOne({ username })
      .then(user =>
        user.comparePassword(password).then(isMatch => {
          if (isMatch) {
            return user.toJSON();
          } else {
            this.log.error(`Invalid password: ${password} provided for username: ${username} `);
            return undefined;
          }
        })
      )
      .catch(err => {
        this.log.error(
          `Unable to find user with username: ${username}, operation failed with this error: ${err}`
        );
        return undefined;
      });
  }

  public async create(user: IUser): Promise<IUser> {
    return new User(user)
      .save()
      .then(result => result.toJSON())
      .catch(err => {
        this.log.error(
          `Failed to save this user: ${user}, operation failed with this error: ${err}`
        );
        return undefined;
      });
  }
}
