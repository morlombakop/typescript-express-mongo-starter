import { Query, Resolver } from 'type-graphql';
import { Authorized } from 'routing-controllers';
import { User } from '../graphql-models/User';
import { UserRepository } from '../../repositories/UserRepository';
import { IUser } from '../../types/UserType';
import { Service, Container } from 'typedi';

@Resolver(of => User)
@Service()
export class UserResolver {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = Container.get<UserRepository>(UserRepository);
  }

  @Authorized()
  @Query(returns => [User])
  public users(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }
}
