import { AppError } from '../../../../core/logic/AppError';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { UseCase } from '../../../../core/logic/UseCase';
import { Comment } from '../../../../domain/entities/comment';
import { ICommentRepo } from '../../../../domain/repositories/commentRepo';
import { CommentRequestDto } from './CommentRequestDto';

type Response = Either<AppError.UnexpectedError, Result<any>>;
export class CreateCommentUseCase
  implements UseCase<CommentRequestDto, Promise<Response>>
{
  private commentRepo: ICommentRepo;

  constructor(commentRepo: ICommentRepo) {
    this.commentRepo = commentRepo;
  }
  public execute = async (request: CommentRequestDto): Promise<Response> => {
    try {
      //validate comment schema
      const commentOrError = Comment.create({
        userId: request.userId,
        postId: request.postId,
        content: request.content
      });

      if (commentOrError.isFailure) {
        const errorMessage = commentOrError.error as string;
        return left(new AppError.UnexpectedError(errorMessage)) as Response;
      }
      const comment = await this.commentRepo.save(commentOrError.getValue());
      return right(Result.ok(comment));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  };
}
