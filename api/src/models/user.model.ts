/*
 * Mongoose User Model
 */

// import packages
import { Schema, model, Model, CallbackError } from 'mongoose';

// User interface
export interface IUser {
  _id: string;
  username?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    username: {
      type: String,
      lowercase: true,
      minlength: 3,
      required: true,
      index: { unique: true },
    },
    password: { type: String, minlength: 8, required: true },
  },
  { timestamps: true },
);

/*
 * username validators
 * username must contain at least 3 characters
 */
userSchema.path('username').validate(async (username: string): Promise<boolean> => {
  const usernameRegex = /(?=.{3,})/;
  return usernameRegex.test(username);
}, 'Username must contains atleast 3 characters.');

/*
 * password validators
 * password must contains at least 8 characters, at least 1 lowercase letter,
 * 1 uppercase letter, 1 special character, and 1 number
 */
userSchema.path('password').validate(async (password: string): Promise<boolean> => {
  const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  return passwordRegex.test(password);
}, 'Password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 special character, 1 number.');

// export so can be imported by other files
export const User: Model<IUser> = model<IUser>('users', userSchema);
