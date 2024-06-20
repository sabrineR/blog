export interface RegisterRequestDto {
  userName: string;
  email: string;
  password: string;
  imagePath?: string;
  role: boolean;
}
