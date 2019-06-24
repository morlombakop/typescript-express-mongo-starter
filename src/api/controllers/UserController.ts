import { JsonController, Get } from 'routing-controllers';

@JsonController('/users')
export default class UserController {
  @Get('/me')
  public findMe(): any {
    return {
      name: 'BabeBoy',
      age: 31,
      description: 'King of Wakanda',
    };
  }
}
