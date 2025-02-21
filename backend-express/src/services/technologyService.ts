import Technology, { ITechnology } from "../models/technologyModel";
import slugify from "slugify";
import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

export default class TechnologyService {
  // Get public technologies
  static async getPublicTechnologies(): Promise<ITechnology[]> {
    return Technology.find().exec();
  }

  // Get all technologies (admin)
  static async getAllTechnologies(): Promise<ITechnology[]> {
    return Technology.find().exec();
  }

  static async createTechnology(technologyData: Partial<ITechnology>): Promise<ITechnology> {
    const slug = slugify(technologyData.name || "", { lower: true, strict: true });

    const newTechnology = new Technology({
      ...technologyData,
      slug,
    });

    return newTechnology.save();
  }

  static async updateTechnology(slug: string, technologyData: Partial<ITechnology>): Promise<ITechnology | null> {
    return Technology.findOneAndUpdate({ slug }, technologyData, { new: true }).exec();
  }

  static async deleteTechnology(slug: string): Promise<ITechnology | null> {
    return Technology.findOneAndDelete({ slug }).exec();
  }
}