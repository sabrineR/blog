export interface UpdatePostRequestDto {
  id: number;
  userId: number;
  title: string;
  content: string;
  imagePath?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
