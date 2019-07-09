import { Field, ID, ObjectType } from 'type-graphql';
import { Token } from './Token';
import { Profile } from './Profile';

@ObjectType({
  description: 'User object.',
})
export class User {
  @Field(type => ID)
  public id: string;

  @Field({ description: 'User name or email, this field is unique' })
  public username: string;

  @Field({ description: 'Password reset token', nullable: true })
  public passwordResetToken: string;

  @Field({ description: 'Password reset expiration date', nullable: true })
  public passwordResetExpires: Date;

  @Field(type => [String], { description: 'User roles', nullable: true })
  public roles: string[];

  @Field(type => [Token], { description: 'User tokens', nullable: true })
  public tokens: Token[];

  @Field(type => Profile, { description: 'user profile object', nullable: true })
  public profile: Profile;
}
