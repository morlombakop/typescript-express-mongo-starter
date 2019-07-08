import bcrypt from 'bcrypt';
import mongoose, { HookNextFunction, Schema, model } from 'mongoose';

import { IUser } from '../types/UserType';
import { env } from '../../env';

export interface IUserSchema extends IUser, mongoose.Document {
  comparePassword(password: string): Promise<boolean>;
  // Need to implement the method below
  validPassword(password: string, cb: any): string;
}

const Token = new Schema(
  {
    kind: { type: String },
    accessToken: { type: String },
    tokenSecret: { type: String },
  },
  {
    _id: false,
  }
);

const Profile = new Schema(
  {
    name: { type: String },
    gender: { type: String },
    location: { type: String },
    website: { type: String },
    picture: { type: String },
  },
  {
    _id: false,
  }
);

const schema = new Schema(
  {
    username: { type: String, unique: true, minlength: 4, trim: true },
    password: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date, default: new Date() },
    tokens: [Token],
    roles: { type: Array, default: [env.app.user.defaultRole] },
    profile: {
      type: Profile,
    },
  },
  {
    timestamps: true,
    collection: 'users',
    toJSON: {
      virtuals: true,
      transform: (doc, obj) => {
        delete obj.__v;
        delete obj._id;
        return obj;
      },
    },
    versionKey: false,
  }
);

/**
 * Password hash middleware.
 */
schema.pre<IUserSchema>('save', function save(next: HookNextFunction): void {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) {
        return next(error);
      }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
schema.methods.comparePassword = function comparePassword(
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUserSchema>('User', schema);
