import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { IUser } from '../types/User';

export interface IUserModel extends IUser, mongoose.Document {
  comparePassword(password: string, cb: any): string;
  validPassword(password: string, cb: any): string;
}

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  tokens: Array,

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String,
  },
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre<IUserModel>('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) { return next(error); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};
