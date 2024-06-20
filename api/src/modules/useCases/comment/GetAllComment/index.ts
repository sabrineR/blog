import { GetCommentsController } from './GetCommentsController';
import { GetCommentsUseCase } from './GetCommentsUseCase';
import { commentRepo } from '../../../../domain/repositories';

const getCommentsUseCase = new GetCommentsUseCase(commentRepo);
const getCommentsController = new GetCommentsController(getCommentsUseCase);
export { getCommentsController };
