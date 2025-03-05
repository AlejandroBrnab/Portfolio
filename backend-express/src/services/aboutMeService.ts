import AboutMe, { IAboutMe } from "../models/aboutMeModel";

export default class AboutMeService {
  // Get the about me description
  static async getAboutMe(): Promise<IAboutMe | null> {
    return AboutMe.findOne().exec();
  }

  static async getAboutMeAdmin(): Promise<IAboutMe | null> {
    return AboutMe.findOne().exec();
  }

  // Update the about me description
  static async updateAboutMe(descriptions: { en?: string; fr?: string }): Promise<IAboutMe | null> {
    const aboutMe = await AboutMe.findOne();
    
    if (aboutMe) {
      if (descriptions.en) aboutMe.description.en = descriptions.en;
      if (descriptions.fr) aboutMe.description.fr = descriptions.fr;
      return aboutMe.save();
    } else {
      const newAboutMe = new AboutMe({
        description: {
          en: descriptions.en || "Default English text",
          fr: descriptions.fr || "Texte français par défaut",
        },
      });
      return newAboutMe.save();
    }
  }
}