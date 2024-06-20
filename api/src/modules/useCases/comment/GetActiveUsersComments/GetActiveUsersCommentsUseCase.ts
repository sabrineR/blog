import { AppError } from '../../../../core/logic/AppError';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { UseCase } from '../../../../core/logic/UseCase';
import { ICommentRepo } from '../../../../domain/repositories/commentRepo';
import { groupCommentsByUserAndPost } from '../../../../shared/utils/CommentHelper';
import { Comment, UserWithPosts } from './interfaces';

type Response = Either<AppError.UnexpectedError, Result<UserWithPosts[]>>;
export class GetActiveUsersCommentsUseCase
  implements UseCase<any, Promise<Response>>
{
  private commentRepo: ICommentRepo;
  constructor(commentRepo: ICommentRepo) {
    this.commentRepo = commentRepo;
  }
  public execute = async (): Promise<Response> => {
    try {
      // Récupère les commentaires des dernières 24 heures.
      const comments: Comment[] =
        await this.commentRepo.findCommentsInLast24Hours();
      // Vérifie s'il n'y a aucun commentaire dans les dernières 24 heures.
      if (comments.length === 0) {
        return left(
          new AppError.UnexpectedError('No Comment in last 24 hours')
        );
      }
      // fonction helper pour regrouper les commentaires par userId et postId.
      const resultArray = groupCommentsByUserAndPost(comments);
      return right(Result.ok<UserWithPosts[]>(resultArray));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  };
}
