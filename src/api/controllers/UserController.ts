import { Response } from 'express';
import { JsonController, Get, Post, Body, Param, Res, Authorized } from 'routing-controllers';
import { UserRepository } from '../repositories/UserRepository';
import { IUserModel } from '../models/UserModel';
import { generateJwt } from '../../lib/jwt';
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
  public create(@Body() user: IUserModel): Promise<IUserModel> {
    return this.userRepository.create(user);
  }

  @Get()
  public getAll(): Promise<IUserModel[]> {
    return this.userRepository.findAll();
  }

  @Get('/one/:id')
  public getOne(@Param('id') id: string): Promise<IUserModel | undefined> {
    return this.userRepository.findById(id);
  }

  @Post('/login')
  public login(
    @Res() res: Response,
    @Body() { username, password }: Partial<IUserModel>
  ): Promise<IUserModel> {
    return this.userRepository.findByUsernameAndPassword(username, password).then(user => {
      // @ts-ignore
      const jwt = generateJwt({ userId: user.id, roles: user.roles });
      res.setHeader('authorization', `Bearer ${jwt}`);

      return user;
    });
  }
}
