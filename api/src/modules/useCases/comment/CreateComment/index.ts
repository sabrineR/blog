import { CreateCommentController } from './CreateCommentController';
import { CreateCommentUseCase } from './CreateCommentUseCase';
import { commentRepo } from '../../../../domain/repositories';

const createCommentUseCase = new CreateCommentUseCase(commentRepo);
const createCommentController = new CreateCommentController(
  createCommentUseCase
);
export { createCommentController };
