import { GetActiveUsersCommentsController } from './GetActiveUsersCommentsController';
import { GetActiveUsersCommentsUseCase } from './GetActiveUsersCommentsUseCase';
import { commentRepo } from '../../../../domain/repositories';

const getActiveUsersCommentsUseCase = new GetActiveUsersCommentsUseCase(
  commentRepo
);
const getActiveUsersCommentsController = new GetActiveUsersCommentsController(
  getActiveUsersCommentsUseCase
);
export { getActiveUsersCommentsController };
