/*
 * Mongoose User Model
 */

// import packages
import { Schema, model, Model, CallbackError } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SALT_WORK_FACTOR } from '../utils/constants';

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

/*
 * pre-save mongoose hook to salt and hash the user password
 */
userSchema.pre<IUser>('save', function (next) {
  const user: any = this;

  // only hash the password if it has been modified (or is new)
  if (user.isModified('password') === true || user.isNew === true) {
    bcrypt.hash(user.password, SALT_WORK_FACTOR, (err: CallbackError | undefined, hash: string) => {
      if (err) {
        return next(err);
      }
      // override the clear-text password with the hashed one
      user.password = hash;
      next();
    });
  } else {
    return next();
  }
});

// hash password before saving
userSchema.pre<IUser>(/^findOneAndUpdate$/, function (next) {
  const user: IUser | any = this;

  if (user._update.$set.password != null) {
    bcrypt.hash(user._update.$set.password, SALT_WORK_FACTOR, (err: CallbackError | undefined, hash: string) => {
      if (err) {
        // error hashing the token
        return next(err);
      }
      // overwrite the plain text token with the hashed token
      user._update.$set.password = hash;
      next();
    });
  } else {
    return next();
  }
});

// export so can be imported by other files
export const User: Model<IUser> = model<IUser>('users', userSchema);
