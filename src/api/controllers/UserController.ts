import { JsonController, Get, Post, Body } from 'routing-controllers';
import { UserRepository } from '../repositories/UserRepository';
import { IUser } from '../types/User';

@JsonController('/users')
export class UserController {
  constructor(
    private userRepository: UserRepository
) { }

  @Get('/me')
  public findMe(): any {
    return {
      name: 'BabeBoy',
      age: 31,
      description: 'Son of Wakanda',
    };
  }

  @Post()
  public async create(@Body() user: IUser): Promise<IUser> {
    console.log('#####', user);
    return this.userRepository.create(user);
  }
}
