import { GetPostByIdController } from './GetPostByIdController';
import { GetPostByIdUseCase } from './GetPostByIdUseCase';
import { postRepo } from '../../../../domain/repositories';

const getPostByIdUseCase = new GetPostByIdUseCase(postRepo);
const getPostByIdController = new GetPostByIdController(getPostByIdUseCase);
export { getPostByIdController };
