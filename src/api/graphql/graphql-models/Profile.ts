import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'User Profile'})
export class Profile {
  @Field({ description: 'User Name'})
  public name: string;

  @Field({ description: 'User gender male or female'})
  public gender: string;

  @Field({ description: 'Profile picture url'})
  public picture: string;
}
