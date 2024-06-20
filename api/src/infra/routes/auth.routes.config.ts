import express from 'express';
import { registerController } from '../../modules/useCases/auth/Register';
import { loginController } from '../../modules/useCases/auth/Login';

export class AuthRoutes {
  public router: express.Router;
  constructor() {
    this.router = express.Router();
    this.authRoutes();
  }
  protected authRoutes(): any {
    this.router.post('/signup', registerController.signup);
    this.router.post('/login', loginController.login);
  }
}
