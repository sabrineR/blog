import express from 'express';
import {
  authenticateJWT,
  authorizeRoleAdmin
} from '../../shared/utils/verifyAuth';
import { getAdminUsersController } from '../../modules/useCases/user/getAdminUsers';
import { deleteAdminController } from '../../modules/useCases/user/deleteAdminUsers';

export class UserRoutes {
  public router: express.Router;
  constructor() {
    this.router = express.Router();
    this.userRoutes();
  }
  protected userRoutes(): any {
    this.router.get(
      '/users',
      authenticateJWT,
      authorizeRoleAdmin(true),
      getAdminUsersController.getUsers
    );
    this.router.delete(
      '/users/:id',
      authenticateJWT,
      authorizeRoleAdmin(true),
      deleteAdminController.deleteUser
    );
  }
}
