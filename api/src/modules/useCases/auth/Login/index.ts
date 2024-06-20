import { LoginController } from './LoginController';
import { LoginUseCase } from './LoginUseCae';
import { userRepo } from '../../../../domain/repositories';

const loginUseCase = new LoginUseCase(userRepo);
const loginController = new LoginController(loginUseCase);

export { loginController };
