import { DeletePostUserController } from './DeletePostUserController';
import { DeletePostUserUseCase } from './DeletePostUserUseCase';
import { postRepo } from '../../../../domain/repositories';

const deletePostUserUseCase = new DeletePostUserUseCase(postRepo);
const deletePostUserController = new DeletePostUserController(
  deletePostUserUseCase
);
export { deletePostUserController };
