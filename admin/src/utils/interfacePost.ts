import { Comment } from "./commentInterface";

export interface Post {
  id: number;
  userId: number;
  User: { userId: number; username: string; imagePath: string };
  title: string;
  content: string;
  imagePath: string;
  Comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}
