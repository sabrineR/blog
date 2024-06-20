import { GetPostsController } from './GetPostsController';
import { GetPostsUseCase } from './GetPostsUseCase';
import { postRepo } from '../../../../domain/repositories';

const getPostsUseCase = new GetPostsUseCase(postRepo);
const getPostsController = new GetPostsController(getPostsUseCase);
export { getPostsController };
