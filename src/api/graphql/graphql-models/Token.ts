import { Field, ObjectType } from 'type-graphql';

@ObjectType({
  description: 'Token for a claim',
})
export class Token {
  @Field({ description: 'The type of token' })
  public kind: string;

  @Field({
    description: 'The access token for the claim',
  })
  public accessToken: string;

  @Field({ description: 'Secret to for this token decryption ' })
  public tokenSecret?: string;
}
