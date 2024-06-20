import { Mapper } from '../../core/logic/Mapper';
import { Post } from '../entities/post';

export class PostMap implements Mapper<Post> {
  public static async toPersistence(post: Post): Promise<any> {
    return {
      userId: post.userId,
      title: post.title,
      content: post.content,
      imagePath: post.imagePath
    };
  }
}
