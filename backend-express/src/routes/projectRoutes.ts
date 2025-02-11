import express from "express";
import asyncHandler from "express-async-handler";
import ProjectController from "../controllers/projectController";
import { checkJwt, checkPermissions } from "../middleware/auth";

const router = express.Router();

// Public projects
router.get("/", ProjectController.getPublicProjects);

// Admin: Get all projects
router.get("/admin", checkJwt, checkPermissions(), asyncHandler(ProjectController.getAllProjects));
// Add a new project
router.post("/", checkJwt, checkPermissions(), asyncHandler(ProjectController.addProject));
// Delete a project by ID
router.delete("/:slug", checkJwt, checkPermissions(), asyncHandler(ProjectController.deleteProjectBySlug));
// Update a project by ID
router.put("/:slug", checkJwt, checkPermissions(), asyncHandler(ProjectController.updateProjectBySlug));


export default router;
