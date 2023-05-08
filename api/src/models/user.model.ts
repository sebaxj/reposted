/*
 * Mongoose User Model
 */

// import packages
import { Schema, model, Model } from 'mongoose';

// User interface
export interface IUser {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    username: {
      type: String,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
      required: false,
      // default is a randomly generated username of user_ + 15 random letters, digits, _, and .
      default: `user_${Math.random().toString(36).substr(0, 15)}`,
      index: { unique: true },
    },
    firstName: { type: String, required: true, minlength: 1 },
    lastName: { type: String, required: true, minlength: 1 },
    email: { type: String, required: true, index: { unique: true } },
  },
  { timestamps: true },
);

/*
 * email validators
 * must be a valid email
 */
userSchema.path('email').validate(async (email: string): Promise<boolean> => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}, 'Email must be valid');

/*
 * First Name validator
 * Must be all letters and at least 1 character
 */
userSchema.path('firstName').validate(async (firstName: string): Promise<boolean> => {
  const firstNameRegex = /^[a-zA-Z]+$/;
  return firstNameRegex.test(firstName);
}, 'First Name must be all letters and at least 1 character long');

/*
 * Last Name validator
 * Must be all letters and at least 1 character
 */
userSchema.path('lastName').validate(async (lastName: string): Promise<boolean> => {
  const lastNameRegex = /^[a-zA-Z]+$/;
  return lastNameRegex.test(lastName);
}, 'Last Name must be all letters and at least 1 character long');

/*
 * Username validator
 * Must be between 3 and 20 letters, numbers, _, or .
 */
userSchema.path('username').validate(async (username: string): Promise<boolean> => {
  const usernameRegex = /^[a-zA-Z0-9_.]{3,20}$/;
  return usernameRegex.test(username);
}, 'Username must be between 3 and 20 letters, numbers, _, or .');

// export so can be imported by other files
export const User: Model<IUser> = model<IUser>('users', userSchema);
