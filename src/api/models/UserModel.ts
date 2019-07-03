export interface Tokens {
  kind: string;
  accessToken: string;
  tokenSecret?: string;
}

export interface IUserModel {
  username: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  roles: string[];
  tokens: Tokens[];

  profile: {
    name: string;
    gender: string;
    picture: string;
  };
}
