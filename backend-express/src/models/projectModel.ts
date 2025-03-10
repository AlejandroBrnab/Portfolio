import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  about: string;
  link: string;
  slug: string;
  title: string;
  img: string;
}

const ProjectSchema: Schema = new Schema(
  {
    about: { type: String, required: true },
    link: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    img: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", ProjectSchema);