import { UpdateCommentController } from './UpdateCommentController';
import { UpdateCommentUseCase } from './UpdateCommentUseCase';
import { commentRepo } from '../../../../domain/repositories';

const updateCommentUseCase = new UpdateCommentUseCase(commentRepo);
const updateCommentController = new UpdateCommentController(
  updateCommentUseCase
);
export { updateCommentController };
