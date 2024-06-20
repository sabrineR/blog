import { GetPostByUserController } from './GetPostByUserController';
import { GetPostByUserUseCase } from './GetPostByUserUseCase';
import { postRepo } from '../../../../domain/repositories';

const getPostByUserUseCase = new GetPostByUserUseCase(postRepo);
const getPostByUserController = new GetPostByUserController(
  getPostByUserUseCase
);
export { getPostByUserController };
