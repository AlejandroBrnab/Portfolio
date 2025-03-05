import { Request, Response, NextFunction } from "express";
import AboutMeService from "../services/aboutMeService";

export default class AboutMeController {
  // Get the about me description
  static async getAboutMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const aboutMe = await AboutMeService.getAboutMe();
      res.json(aboutMe);
    } catch (error) {
      next(error);
    }
  }

  static async getAboutMeAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const aboutMe = await AboutMeService.getAboutMeAdmin();
      res.json(aboutMe);
    } catch (error) {
      next(error);
    }
  }

  // Update the about me description
  static async updateAboutMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const descriptions = req.body.descriptions;
      const updatedAboutMe = await AboutMeService.updateAboutMe(descriptions);
      res.json(updatedAboutMe);
    } catch (error) {
      next(error);
    }
  }
}