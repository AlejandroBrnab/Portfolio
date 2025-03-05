import express from "express";
import { checkJwt, checkPermissions } from "../middleware/auth";
import asyncHandler from "express-async-handler";
import AboutMeController from "../controllers/aboutMeController";

const router = express.Router();

// GET the about me description
router.get("/", AboutMeController.getAboutMe);

router.get("/admin", checkJwt, checkPermissions(), asyncHandler(AboutMeController.getAboutMeAdmin));
// PUT to update the about me description (admin)
router.put("/", checkJwt, checkPermissions(), asyncHandler(AboutMeController.updateAboutMe));

export default router;