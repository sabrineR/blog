import { AppError } from '../../../../core/logic/AppError';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { UseCase } from '../../../../core/logic/UseCase';
import { IPostRepo } from '../../../../domain/repositories/postRepo';
import { UpdatePostRequestDto } from './UpdatePostRequestDto';

type Response = Either<AppError.UnexpectedError, Result<any>>;
export class UpdatePostUseCase
  implements UseCase<UpdatePostRequestDto, Promise<Response>>
{
  private postRepo: IPostRepo;
  constructor(postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }

  public execute = async (request: UpdatePostRequestDto): Promise<Response> => {
    try {
      const { id, userId, title, content, imagePath } = request;
      const post = await this.postRepo.getPostByID(id);
      if (post.userId !== userId) {
        return left(new AppError.UnexpectedError('Forbidden'));
      }
      if (title !== undefined && title !== '') post.title = title;
      if (content !== undefined && content !== '') post.content = content;
      if (imagePath !== undefined && imagePath !== '')
        post.imagePath = imagePath;
      const postId = await this.postRepo.save(post);
      return right(Result.ok(postId));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  };
}
