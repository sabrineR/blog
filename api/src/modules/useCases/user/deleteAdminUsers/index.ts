import { DeleteAdminController } from './DeleteAdminController';
import { DeleteAdminUserUseCase } from './DeleteAdminUserUseCase';
import { userRepo } from '../../../../domain/repositories';

const deleteAdminUserUseCase = new DeleteAdminUserUseCase(userRepo);
const deleteAdminController = new DeleteAdminController(deleteAdminUserUseCase);
export { deleteAdminController };
