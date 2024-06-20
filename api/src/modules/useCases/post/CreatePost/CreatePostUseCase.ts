import { AppError } from '../../../../core/logic/AppError';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { UseCase } from '../../../../core/logic/UseCase';
import { Post } from '../../../../domain/entities/post';
import { IPostRepo } from '../../../../domain/repositories/postRepo';
import { PostRequestDto } from './PostRequestDto';

type Response = Either<AppError.UnexpectedError, Result<any>>;
export class CreatePostUseCase
  implements UseCase<PostRequestDto, Promise<Response>>
{
  private postRepo: IPostRepo;

  constructor(postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }
  public execute = async (request: PostRequestDto): Promise<Response> => {
    try {
      //validate post schema
      const postOrError = Post.create({
        userId: request.userId,
        title: request.title,
        content: request.content,
        imagePath: request.imagePath
      });

      if (postOrError.isFailure) {
        const errorMessage = postOrError.error as string;
        return left(new AppError.UnexpectedError(errorMessage)) as Response;
      }
      const post = await this.postRepo.save(postOrError.getValue());
      return right(Result.ok(post));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  };
}
