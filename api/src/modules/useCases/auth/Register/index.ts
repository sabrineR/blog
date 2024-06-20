import { RegisterController } from './RegisterController';
import { RegisterUseCase } from './RegisterUseCase';
import { userRepo } from '../../../../domain/repositories';

const registerUseCase = new RegisterUseCase(userRepo);
const registerController = new RegisterController(registerUseCase);

export { registerController };
