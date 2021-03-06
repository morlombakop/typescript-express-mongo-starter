import { IUser } from '../../types/UserType';
import { IFindById, ICreate, IFindAll } from './Base';

export interface IUserRepository extends IFindById<IUser>, ICreate<IUser>, IFindAll<IUser> {
  findByUsernameAndPassword: (username: string, password: string) => Promise<IUser>;
}
