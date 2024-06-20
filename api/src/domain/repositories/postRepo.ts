import { Post } from '../entities/post';
export interface IPostRepo {
  save(post: Post): Promise<number>;
  getPosts(): Promise<any>;
  getPostByID(id: number): Promise<Post>;
  getPostByUser(id: number): Promise<Post>;
  deletePostById(id: number): Promise<boolean>;
}
