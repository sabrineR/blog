import { AppError } from '../../../../core/logic/AppError';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { UseCase } from '../../../../core/logic/UseCase';
import { IPostRepo } from '../../../../domain/repositories/postRepo';
import { ResponsePosts } from './GetPostsResponse';

type Response = Either<AppError.UnexpectedError, Result<ResponsePosts>>;
export class GetPostsUseCase implements UseCase<any, Promise<Response>> {
  private postRepo: IPostRepo;
  constructor(postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }
  public execute = async (): Promise<Response> => {
    try {
      const posts = await this.postRepo.getPosts();
      return right(Result.ok<ResponsePosts>(posts));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  };
}
