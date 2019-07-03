import { IUserModel } from '../../models/UserModel';
import { IFindById, ICreate, IFindAll } from './Base';

export interface IUserRepository extends IFindById<IUserModel>, ICreate<IUserModel>, IFindAll<IUserModel> {
  findByUsernameAndPassword: (username: string, password: string) => Promise<IUserModel>;
}
