import { AppError } from '../../../../core/logic/AppError';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { UseCase } from '../../../../core/logic/UseCase';
import { IPostRepo } from '../../../../domain/repositories/postRepo';

type Response = Either<AppError.UnexpectedError, Result<boolean>>;
export class DeletePostAdminUseCase
  implements UseCase<{ id: number }, Promise<Response>>
{
  private postRepo: IPostRepo;
  constructor(postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }
  public execute = async (request: { id: number }): Promise<Response> => {
    try {
      const result = await this.postRepo.deletePostById(request.id);
      return right(Result.ok(result));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  };
}
