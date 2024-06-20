import { DeleteCommentUserController } from './DeleteCommentUserController';
import { DeleteCommentUserUseCase } from './DeleteCommentUserUseCase';
import { commentRepo } from '../../../../domain/repositories';

const deleteCommentUserUseCase = new DeleteCommentUserUseCase(commentRepo);
const deleteCommentUserController = new DeleteCommentUserController(
  deleteCommentUserUseCase
);
export { deleteCommentUserController };
