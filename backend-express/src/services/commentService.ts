import CommentModel, { IComment } from '../models/commentModel';
import pino from 'pino';

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true
    }
  }
});


class CommentService {
  // Get comments by approval status
  async getCommentsByApprovalStatus(approved: boolean): Promise<IComment[]> {
    return CommentModel.find({ approved }).exec();
  }

  // Update approval status of a comment
  async updateCommentApprovalStatus(commentId: string, approved: boolean) {
    return CommentModel.findOneAndUpdate({ commentId }, { approved }, { new: true }).exec();
  }

  // Delete a comment by ID
  async deleteCommentById(commentId: string) {
    return CommentModel.findOneAndDelete({ commentId }).exec();
  }
}

export default new CommentService();