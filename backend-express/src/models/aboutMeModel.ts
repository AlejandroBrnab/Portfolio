import mongoose, { Schema, Document } from "mongoose";

export interface IAboutMe extends Document {
  description: {
    en: string;
    fr: string;
  };
}

const AboutMeSchema: Schema = new Schema(
  {
    description: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
  },
  { timestamps: true, collection: "about" }
);

export default mongoose.model<IAboutMe>("AboutMe", AboutMeSchema);