import { Comment } from '../entities/comment';
export interface ICommentRepo {
  save(Comment: Comment): Promise<number>;
  getComments(): Promise<any>;
  findCommentsInLast24Hours(): Promise<any>;
  deleteCommentById(id: number): Promise<boolean>;
  getCommentByID(id: number): Promise<any>;
}
