export interface Tokens {
  kind: string;
  accessToken: string;
  tokenSecret?: string;
}

export interface IUser {
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;

  tokens: Tokens[];

  profile: {
    name: string;
    gender: string;
    picture: string;
  };
}
