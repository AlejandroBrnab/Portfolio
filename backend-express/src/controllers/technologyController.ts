import { Request, Response, NextFunction } from "express";
import TechnologyService from "../services/technologyService";

export default class TechnologyController {
  // Get public technologies
  static async getPublicTechnologies(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const technologies = await TechnologyService.getPublicTechnologies();
      res.json(technologies);
    } catch (error) {
      next(error);
    }
  }

  // Get all technologies (admin)
  static async getAllTechnologies(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const technologies = await TechnologyService.getAllTechnologies();
      res.json(technologies);
    } catch (error) {
      next(error);
    }
  }

  static async createTechnology(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newTechnology = await TechnologyService.createTechnology(req.body);
      res.status(201).json(newTechnology);
    } catch (error) {
      next(error);
    }
  }

  static async updateTechnology(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updatedTechnology = await TechnologyService.updateTechnology(req.params.slug, req.body);
      if (!updatedTechnology) {
        res.status(404).json({ message: "Technology not found" });
        return;
      }
      res.json(updatedTechnology);
    } catch (error) {
      next(error);
    }
  }

  static async deleteTechnology(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deletedTechnology = await TechnologyService.deleteTechnology(req.params.slug);
      if (!deletedTechnology) {
        res.status(404).json({ message: "Technology not found" });
        return;
      }
      res.json({ message: "Technology deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}