import { JsonController, Get } from 'routing-controllers';

@JsonController('/users')
export class UserController {
  @Get('/me')
  public findMe(): any {
    return {
      name: 'BabeBoy',
      age: 31,
      description: 'Son of Wakanda',
    };
  }
}
