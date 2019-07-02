import { Response } from 'express';
import { JsonController, Get, Post, Body, Param, Res } from 'routing-controllers';
import { UserRepository } from '../repositories/UserRepository';
import { IUser } from '../types/User';
import { generateJwt } from '../../lib/jwt';

@JsonController('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get('/me')
  public findMe(): any {
    return {
      name: 'BabeBoy',
      age: 31,
      description: 'Son of Wakanda',
    };
  }

  @Post()
  public create(@Body() user: IUser): Promise<IUser> {
    return this.userRepository.create(user);
  }

  @Get()
  public getAll(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  @Get('/:id')
  public getOne(@Param('id') id: string): Promise<IUser | undefined> {
    return this.userRepository.findById(id);
  }

  @Post('/login')
  public login(
    @Res() res: Response,
    @Body() { username, password }: Partial<IUser>
  ): Promise<IUser> {
    return this.userRepository.findByUsernameAndPassword(username, password).then(user => {
      // @ts-ignore
      const jwt = generateJwt({ userId: user.id });
      res.setHeader('authorization', `Bearer ${jwt}`);

      return user;
    });
  }
}
