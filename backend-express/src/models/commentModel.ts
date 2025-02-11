import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IComment extends Document {
  text: string;
  author: string;
  approved: boolean;
  commentId: string;
}

const CommentSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    author: { type: String, required: true },
    approved: { type: Boolean, default: false },
    commentId: { type: String, default: uuidv4, unique: true },
  },
  { timestamps: true, collection: 'comments' }
);

export default mongoose.model<IComment>('Comment', CommentSchema);