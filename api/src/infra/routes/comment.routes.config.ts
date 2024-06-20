import express from 'express';
import {
  authenticateJWT,
  authorizeRoleAdmin
} from '../../shared/utils/verifyAuth';
import { createCommentController } from '../../modules/useCases/comment/CreateComment';
import { updateCommentController } from '../../modules/useCases/comment/UpdateComment';
import { deleteCommentAdminController } from '../../modules/useCases/comment/DeleteComment';
import { deleteCommentUserController } from '../../modules/useCases/comment/DeleteCommentUser';
import { getCommentsController } from '../../modules/useCases/comment/GetAllComment';
import { getActiveUsersCommentsController } from '../../modules/useCases/comment/GetActiveUsersComments';

export class CommentRoutes {
  public router: express.Router;
  constructor() {
    this.router = express.Router();
    this.commentRoutes();
  }
  protected commentRoutes(): any {
    // Routes Comment for user
    this.router.post(
      '/',
      authenticateJWT,
      createCommentController.createComment
    );
    this.router.get('/', getCommentsController.getComments);
    this.router.get(
      '/users',
      getActiveUsersCommentsController.getActiveUsersComments
    );
    this.router.put(
      '/:id',
      authenticateJWT,
      updateCommentController.updateComment
    );
    this.router.delete(
      '/:id',
      authenticateJWT,
      deleteCommentUserController.deleteComment
    );

    // Routes Comment for Admin
    this.router.delete(
      '/admin/:id',
      authenticateJWT,
      authorizeRoleAdmin(true),
      deleteCommentAdminController.deleteCommentAdmin
    );
  }
}
