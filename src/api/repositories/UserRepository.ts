import { Service } from 'typedi';

import { User } from '../models/UserModel';
import { IUser } from '../types/User';
import { IUserRepository } from './interfaces/IUserRepository';
import { Logger, LoggerInterface } from '../../decorators/Logger';

@Service()
export class UserRepository implements IUserRepository {
  constructor(@Logger(__filename) private log: LoggerInterface) {}

  public findById(id: string): IUser|undefined {
    User.findById(id, (error, user) => {
      if (error) {
        this.log.error('Unable to find user with id: ', id, error);
      } else if (!user) {
        this.log.error('Unable to find user with id: ', id);
      } else {
        return user.toObject();
      }
    });
    return undefined;
  }

  public findByUsernameAndPassword(username: string, password: string): IUser | undefined {
    User.findOne({ username }, (error, user) => {
      if (error) {
        this.log.error('Unable to find user with username: ', username, error);
      } else if (!user) {
        this.log.error('Unable to find user with username: ', username);
      } else {
        user.comparePassword(password, (err: Error, isMatch: boolean) => {
          if (isMatch) {
            return user;
          } else {
            this.log.error(
              `Invalid password: ${password} provided for username: ${username} `,
              err
            );
            return undefined;
          }
        });
      }
    });

    return undefined;
  }

  public create(document: IUser): IUser {
  //   const technique = new Technique(req.body);
  // const newId = await getAutoIncrementId('techniqueId');

  // technique.createdBy = getUsername(req);
  // technique.created = Date.now();

  // if (!technique._id) {
  //   technique._id = `B${_.padStart(newId, 4, '0')}`;
  // }

  // technique.save((err, technique) => {
  //   if (err) {
  //     res
  //       .status(400)
  //       .json(handleError(err, 'technique'))
  //       .send();
  //   } else {
  //     res.location(`/technique/${technique._id}`);
  //     res.status(201).json(technique);
  //   }
  // });
    return undefined;
  }
}
