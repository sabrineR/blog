import { DeletePostAdminController } from './DeletePostAdminController';
import { DeletePostAdminUseCase } from './DeletePostAdminUseCase';
import { postRepo } from '../../../../domain/repositories';

const deletePostAdminUseCase = new DeletePostAdminUseCase(postRepo);
const deletePostAdminController = new DeletePostAdminController(
  deletePostAdminUseCase
);
export { deletePostAdminController };
