import { GetAdminUsersController } from './GetAdminUsersController';
import { GetAdminUsersUseCase } from './GetAdminUsersUseCase';
import { userRepo } from '../../../../domain/repositories';

const getAdminUsersUseCase = new GetAdminUsersUseCase(userRepo);
const getAdminUsersController = new GetAdminUsersController(
  getAdminUsersUseCase
);
export { getAdminUsersController };
