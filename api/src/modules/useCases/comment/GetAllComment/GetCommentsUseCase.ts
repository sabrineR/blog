import { AppError } from '../../../../core/logic/AppError';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { UseCase } from '../../../../core/logic/UseCase';
import { ICommentRepo } from '../../../../domain/repositories/commentRepo';
import { ResponseComments } from './GetCommentsResponse';

type Response = Either<AppError.UnexpectedError, Result<ResponseComments>>;
export class GetCommentsUseCase implements UseCase<any, Promise<Response>> {
  private commentRepo: ICommentRepo;
  constructor(commentRepo: ICommentRepo) {
    this.commentRepo = commentRepo;
  }
  public execute = async (): Promise<Response> => {
    try {
      const comments = await this.commentRepo.getComments();
      return right(Result.ok<ResponseComments>(comments));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  };
}
