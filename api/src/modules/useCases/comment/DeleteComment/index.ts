import { DeleteCommentAdminController } from './DeleteCommentAdminController';
import { DeleteCommentAdminUseCase } from './DeleteCommentAdminUseCase';
import { commentRepo } from '../../../../domain/repositories';

const deleteCommentAdminUseCase = new DeleteCommentAdminUseCase(commentRepo);
const deleteCommentAdminController = new DeleteCommentAdminController(
  deleteCommentAdminUseCase
);
export { deleteCommentAdminController };
