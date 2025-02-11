import { Request, Response, NextFunction } from "express";
import ProjectService from "../services/projectService";
import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

export default class ProjectController {
  // Get public projects
  static async getPublicProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await ProjectService.getPublicProjects();
      res.status(200).json(projects);
    } catch (error) {
      logger.error({ error }, "Error fetching public projects");
      next(error);
    }
  }

  // Get all projects (admin)
  static async getAllProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await ProjectService.getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      logger.error({ error }, "Error fetching all projects");
      next(error);
    }
  }

  // Add a new project
  static async addProject(req: Request, res: Response, next: NextFunction) {
    try {
      const projectData = req.body;
      const newProject = await ProjectService.addProject(projectData);
      res.status(201).json({ message: "Project added successfully", project: newProject });
    } catch (error) {
      logger.error({ error }, "Error adding project");
      next(error);
    }
  }

  // Delete a project by Slug
static async deleteProjectBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;
    const success = await ProjectService.deleteProjectBySlug(slug);

    if (success) {
      res.status(200).json({ message: "Project deleted successfully" });
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    logger.error({ error }, "Error deleting project");
    next(error);
  }
}

// Update a project by Slug
static async updateProjectBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;
    const updatedData = req.body;
    const updatedProject = await ProjectService.updateProjectBySlug(slug, updatedData);

    if (updatedProject) {
      res.status(200).json({ message: "Project updated successfully", project: updatedProject });
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    logger.error({ error }, "Error updating project");
    next(error);
  }
}
}
