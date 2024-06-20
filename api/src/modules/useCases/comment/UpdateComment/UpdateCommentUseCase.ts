import { AppError } from '../../../../core/logic/AppError';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { UseCase } from '../../../../core/logic/UseCase';
import { ICommentRepo } from '../../../../domain/repositories/commentRepo';
import { UpdateCommentRequestDto } from './UpdateCommentRequestDto';

type Response = Either<AppError.UnexpectedError, Result<any>>;
export class UpdateCommentUseCase
  implements UseCase<UpdateCommentRequestDto, Promise<Response>>
{
  private commentRepo: ICommentRepo;
  constructor(commentRepo: ICommentRepo) {
    this.commentRepo = commentRepo;
  }

  public execute = async (
    request: UpdateCommentRequestDto
  ): Promise<Response> => {
    try {
      const { id, userId, content } = request;
      const comment = await this.commentRepo.getCommentByID(id);
      if (comment.userId !== userId) {
        return left(new AppError.UnexpectedError('Forbidden'));
      }
      if (content !== undefined && content !== '') comment.content = content;
      const commentId = await this.commentRepo.save(comment);
      return right(Result.ok(commentId));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  };
}
