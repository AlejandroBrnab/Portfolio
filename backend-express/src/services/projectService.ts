import Project, { IProject } from "../models/projectModel";
import slugify from "slugify";
import mongoose from "mongoose";
import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

export default class ProjectService {
  // Get public projects
  static async getPublicProjects(): Promise<IProject[]> {
    return Project.find().exec();
  }

  // Get all projects (admin)
  static async getAllProjects(): Promise<IProject[]> {
    return Project.find().exec();
  }

  // Add a new project (auto-generating slug)
  static async addProject(projectData: Partial<IProject>): Promise<IProject> {
    const slug = slugify(projectData.title || "", { lower: true, strict: true });

    const newProject = new Project({
      ...projectData,
      slug,
    });

    return newProject.save();
  }

  // Delete a project by Slug
static async deleteProjectBySlug(slug: string): Promise<boolean> {
  const result = await Project.findOneAndDelete({ slug });
  return result !== null;
}

// Update a project by Slug
static async updateProjectBySlug(slug: string, updatedData: Partial<IProject>): Promise<IProject | null> {
  return Project.findOneAndUpdate({ slug }, updatedData, { new: true }).exec();
}

}
