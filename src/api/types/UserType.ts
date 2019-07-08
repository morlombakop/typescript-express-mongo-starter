export interface IToken {
  kind: string;
  accessToken: string;
  tokenSecret?: string;
}

export interface IUser {
  username: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  roles: string[];
  tokens: IToken[];

  profile: {
    name: string;
    gender: string;
    picture: string;
  };
}
