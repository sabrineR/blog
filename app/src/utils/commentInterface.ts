export interface Comment {
  id: number;
  userId: number;
  postId: number;
  content: string;
  User: { username: string; imagePath: string };
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateComment {
  postId: number;
  content: string;
}

export interface IEditComment {
  id: number;
  userId: number;
  User: { username: string; imagePath: string };
  content: string;
  createdAt: Date;
}
