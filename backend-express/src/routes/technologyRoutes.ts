import express from "express";
import { checkJwt, checkPermissions } from "../middleware/auth";
import asyncHandler from "express-async-handler";
import TechnologyController from '../controllers/technologyController';

const router = express.Router();

// GET public technologies
router.get('/', TechnologyController.getPublicTechnologies);

// GET all technologies (admin)
router.get('/admin', checkJwt, checkPermissions(), asyncHandler(TechnologyController.getAllTechnologies));
router.post('/', checkJwt, checkPermissions(), asyncHandler(TechnologyController.createTechnology));
// PUT to update a technology by slug
router.put('/:slug', checkJwt, checkPermissions(), asyncHandler(TechnologyController.updateTechnology));
// DELETE a technology by slug
router.delete('/:slug', checkJwt, checkPermissions(), asyncHandler(TechnologyController.deleteTechnology));

export default router;