import { AppError } from '../../../../core/logic/AppError';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { UseCase } from '../../../../core/logic/UseCase';
import { ICommentRepo } from '../../../../domain/repositories/commentRepo';

type Response = Either<AppError.UnexpectedError, Result<boolean>>;
export class DeleteCommentUserUseCase
  implements UseCase<{ id: number; userId: number }, Promise<Response>>
{
  private commentRepo: ICommentRepo;
  constructor(commentRepo: ICommentRepo) {
    this.commentRepo = commentRepo;
  }
  public execute = async (request: {
    id: number;
    userId: number;
  }): Promise<Response> => {
    try {
      const comment = await this.commentRepo.getCommentByID(request.id);
      if (comment.userId !== request.userId) {
        return left(new AppError.UnexpectedError('Forbidden'));
      }
      const result = await this.commentRepo.deleteCommentById(request.id);
      return right(Result.ok(result));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  };
}
