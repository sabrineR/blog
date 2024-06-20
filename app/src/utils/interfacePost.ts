import { IEditComment } from "./commentInterface";

export interface Post {
  id: number;
  userId: number;
  User: { userId: number; username: string; imagePath: string };
  title: string;
  content: string;
  imagePath: string;
  Comments: IEditComment[];
  createdAt: Date;
  updatedAt: Date;
}
export interface ICreatePost {
  title: string;
  content: string;
  imagePath?: string;
}
