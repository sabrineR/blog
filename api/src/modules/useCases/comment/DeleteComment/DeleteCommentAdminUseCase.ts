import { AppError } from '../../../../core/logic/AppError';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { UseCase } from '../../../../core/logic/UseCase';
import { ICommentRepo } from '../../../../domain/repositories/commentRepo';

type Response = Either<AppError.UnexpectedError, Result<boolean>>;
export class DeleteCommentAdminUseCase
  implements UseCase<{ id: number }, Promise<Response>>
{
  private commentRepo: ICommentRepo;
  constructor(commentRepo: ICommentRepo) {
    this.commentRepo = commentRepo;
  }
  public execute = async (request: { id: number }): Promise<Response> => {
    try {
      const result = await this.commentRepo.deleteCommentById(request.id);
      return right(Result.ok(result));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  };
}
