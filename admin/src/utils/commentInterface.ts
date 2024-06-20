export interface Comment {
  id: number;
  userId: number;
  postId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
