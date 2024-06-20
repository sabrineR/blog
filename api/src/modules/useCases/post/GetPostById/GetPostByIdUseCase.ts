import { AppError } from '../../../../core/logic/AppError';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { UseCase } from '../../../../core/logic/UseCase';
import { Post } from '../../../../domain/entities/post';
import { IPostRepo } from '../../../../domain/repositories/postRepo';

type Response = Either<AppError.UnexpectedError, Result<Post>>;
export class GetPostByIdUseCase implements UseCase<any, Promise<Response>> {
  private postRepo: IPostRepo;
  constructor(postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }
  public execute = async (dto: { id: number }): Promise<Response> => {
    try {
      const post = await this.postRepo.getPostByID(dto.id);
      return right(Result.ok<Post>(post));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  };
}
