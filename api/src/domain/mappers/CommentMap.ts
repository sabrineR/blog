import { Mapper } from '../../core/logic/Mapper';
import { Comment } from '../entities/comment';

export class CommentMap implements Mapper<Comment> {
  public static async toPersistence(comment: Comment): Promise<any> {
    return {
      userId: comment.userId,
      postId: comment.postId,
      content: comment.content
    };
  }
}
