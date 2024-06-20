import express from 'express';
import {
  authenticateJWT,
  authorizeRoleAdmin
} from '../../shared/utils/verifyAuth';
import { createPostController } from '../../modules/useCases/post/CreatePost';
import { updatePostController } from '../../modules/useCases/post/UpdatePost';
import { deletePostAdminController } from '../../modules/useCases/post/DeletePostAdmin';
import { deletePostUserController } from '../../modules/useCases/post/DeletePostUser';
import { getPostsController } from '../../modules/useCases/post/GetAllPost';
import { getPostByIdController } from '../../modules/useCases/post/GetPostById';
import { getPostByUserController } from '../../modules/useCases/post/GetPostByUser';
export class PostRoutes {
  public router: express.Router;
  constructor() {
    this.router = express.Router();
    this.postRoutes();
  }
  protected postRoutes(): any {
    // Routes Post for user
    this.router.post('/', authenticateJWT, createPostController.createPost);
    this.router.get('/', getPostsController.getPosts);
    this.router.get('/:id', getPostByIdController.getPostById);
    this.router.get(
      '/user/:userId',
      authenticateJWT,
      getPostByUserController.getPostByUser
    );
    this.router.put('/:id', authenticateJWT, updatePostController.updatePost);
    this.router.delete(
      '/:id',
      authenticateJWT,
      deletePostUserController.deletePost
    );

    // Routes Post for Admin
    this.router.delete(
      '/admin/:id',
      authenticateJWT,
      authorizeRoleAdmin(true),
      deletePostAdminController.deletePostAdmin
    );
  }
}
