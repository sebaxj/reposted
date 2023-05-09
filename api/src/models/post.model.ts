/*
 * Mongoose Post Model
 */

// import packages
import { Schema, model, Model } from 'mongoose';
import { User } from './user.model';

// User interface
export interface IPost {
  _id: Schema.Types.ObjectId | string;
  userId: Schema.Types.ObjectId | string;
  url: string;
  source: 'twitter' | 'instagram';
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const postSchema: Schema<IPost> = new Schema<IPost>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    url: { type: String, required: true },
    source: { type: String, required: true, enum: ['twitter', 'instagram'] },
  },
  { timestamps: true },
);

/*
 * User ID
 * User must exist
 */
postSchema.path('userId').validate(async (userId: Schema.Types.ObjectId): Promise<boolean> => {
  const user = User.findById(userId);
  return !!user;
}, 'Post must be associated with a valid user');

// export so can be imported by other files
export const Post: Model<IPost> = model<IPost>('posts', postSchema);
