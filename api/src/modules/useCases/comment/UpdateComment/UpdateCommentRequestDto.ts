export interface UpdateCommentRequestDto {
  id: number;
  userId: number;
  postId: string;
  content: string;
}
