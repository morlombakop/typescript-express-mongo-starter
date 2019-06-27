import { IUser } from '../../types/User';
import { IFindById, ICreate } from './Base';

export interface IUserRepository extends IFindById<IUser>, ICreate<IUser> {
  findByUsernameAndPassword: (username: string, password: string) => IUser | undefined;
}
