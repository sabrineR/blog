export interface User {
  id: string;
  userName: string;
  imagePath: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  imagePath: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  User: User;
  Post: Post;
}

export interface UserWithPosts {
  id: string;
  userId: string;
  userName: string;
  imagePath: string;
  posts: PostWithComments[];
}

export interface PostWithComments {
  postId: string;
  title: string;
  content: string;
  imagePost: string;
  comments: CommentDetails[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentDetails {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
