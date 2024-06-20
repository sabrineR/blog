import { CreatePostController } from './CreatePostController';
import { CreatePostUseCase } from './CreatePostUseCase';
import { postRepo } from '../../../../domain/repositories';

const createPostUseCase = new CreatePostUseCase(postRepo);
const createPostController = new CreatePostController(createPostUseCase);
export { createPostController };
