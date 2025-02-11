import express from "express";
import asyncHandler from "express-async-handler";
import CommentController from "../controllers/commentController";
import { checkJwt, checkPermissions } from "../middleware/auth";

const router = express.Router();

router.get('/', asyncHandler(CommentController.getApprovedComments)); //public

router.get('/admin', checkJwt, checkPermissions(), asyncHandler(CommentController.getUnapprovedComments)); //admin
router.put('/:commentId/approve', checkJwt, checkPermissions(), asyncHandler(CommentController.approveComment)); //admin

export default router;