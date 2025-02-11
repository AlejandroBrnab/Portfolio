import { Request, Response, NextFunction } from 'express';
import CommentService from '../services/commentService';
import mongoose, { ObjectId } from 'mongoose';
import jwt from 'jsonwebtoken';
import Comment from '../models/commentModel';  // Make sure the path is correct
import jwksRsa from 'jwks-rsa';
import pino from 'pino';

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true
    }
  }
});

const jwksClient = jwksRsa({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  jwksClient.getSigningKey(header.kid, (err, key) => {
    const signingKey = key?.getPublicKey();
    callback(err, signingKey);
  });
}

export default class CommentController {
  static async getApprovedComments(req: Request, res: Response) {
    try {
        const allComments = await Comment.find();
        console.log("All comments from DB:", allComments);

        const approvedComments = await Comment.find({ approved: true });
        console.log("Approved comments:", approvedComments);

        res.json(approvedComments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

  // Get all unapproved comments
  static async getUnapprovedComments(req: Request, res: Response, next: NextFunction): Promise<void> {
    logger.info('Fetching unapproved comments');
    try {
      const comments = await CommentService.getCommentsByApprovalStatus(false);
      res.status(200).json(comments);
    } catch (error) {
      logger.error({ error }, 'Error fetching unapproved comments');
      next(error);
    }
  }

  // Approve a comment
  static async approveComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    logger.info('Approving a comment');
    try {
      const { commentId } = req.params;
      
      if (!mongoose.Types.ObjectId.isValid(commentId)) {
        res.status(400).json({ error: 'Invalid comment ID format' });
        return;
      }

      const result = await CommentService.updateCommentApprovalStatus(commentId, true);

      if (!result) {
        res.status(404).json({ error: 'Comment not found' });
        return;
      }

      res.status(200).json({ message: 'Comment approved successfully', comment: result });
    } catch (error) {
      logger.error({ error }, 'Error approving comment');
      next(error);
    }
  }

}