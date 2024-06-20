import { UpdatePostController } from './UpdatePostController';
import { UpdatePostUseCase } from './UpdatePostUseCase';
import { postRepo } from '../../../../domain/repositories';

const updatePostUseCase = new UpdatePostUseCase(postRepo);
const updatePostController = new UpdatePostController(updatePostUseCase);
export { updatePostController };
