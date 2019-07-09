import { Response } from 'express';
import { JsonController, Get, Post, Body, Param, Res, Authorized } from 'routing-controllers';
import { UserRepository } from '../repositories/UserRepository';
import { IUser } from '../types/UserType';
import { generateJwt } from '../../util/jwt';
import { env } from '../../env';

@JsonController('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Authorized(env.app.user.defaultRole)
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

  @Get('/one/:id')
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
      const jwt = generateJwt({ userId: user.id, roles: user.roles });
      res.setHeader('authorization', `Bearer ${jwt}`);

      return user;
    });
  }
}
