import { Request, Response, NextFunction } from "express";
import TechnologyService from "../services/technologyService";
import logger from '../config/logger';

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

export default class TechnologyController {
  // Get public technologies
  static async getPublicTechnologies(req: Request, res: Response, next: NextFunction): Promise<void> {
    logger.info('Received request to get public technologies');
    try {
      const technologies = await TechnologyService.getPublicTechnologies();
      logger.info(`Retrieved Public Technologies: ${technologies.map(tech => tech.slug).join(', ')}`);
      res.json(technologies);
    } catch (error) {
      logger.error({ error }, 'Error retrieving public technologies');
      next(error);
    }
  }

  // Get all technologies (admin)
  static async getAllTechnologies(req: Request, res: Response, next: NextFunction): Promise<void> {
    logger.info('Received request to get all technologies');
    try {
      const technologies = await TechnologyService.getAllTechnologies();
      logger.info(`Retrieved Technologies: ${technologies.map(tech => tech.slug).join(', ')}`);
      res.json(technologies);
    } catch (error) {
      logger.error({ error }, 'Error retrieving technologies');
      next(error);
    }
  }

  static async createTechnology(req: Request, res: Response, next: NextFunction): Promise<void> {
    logger.info('Received request to create technology');
    try {
      const newTechnology = await TechnologyService.createTechnology(req.body);
      logger.info(`Created Technology: ${newTechnology.slug}`);
      res.status(201).json(newTechnology);
    } catch (error) {
      logger.error({ error }, 'Error creating technology');
      next(error);
    }
  }

  static async updateTechnology(req: Request, res: Response, next: NextFunction): Promise<void> {
    logger.info('Received request to update technology');
    try {
      const updatedTechnology = await TechnologyService.updateTechnology(req.params.slug, req.body);
      if (!updatedTechnology) {
        logger.warn('Technology not found for updating');
        res.status(404).json({ message: "Technology not found" });
        return;
      }
      logger.info(`Updated Technology: ${updatedTechnology.slug}`);
      res.json(updatedTechnology);
    } catch (error) {
      logger.error({ error }, 'Error updating technology');
      next(error);
    }
  }

  static async deleteTechnology(req: Request, res: Response, next: NextFunction): Promise<void> {
    logger.info('Received request to delete technology');
    try {
      const deletedTechnology = await TechnologyService.deleteTechnology(req.params.slug);
      if (!deletedTechnology) {
        logger.warn('Technology not found for deletion');
        res.status(404).json({ message: "Technology not found" });
        return;
      }
      logger.info(`Deleted Technology: ${deletedTechnology.slug}`);
      res.json({ message: "Technology deleted successfully" });
    } catch (error) {
      logger.error({ error }, 'Error deleting technology');
      next(error);
    }
  }
}