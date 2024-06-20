import { AppError } from '../../../../core/logic/AppError';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { UseCase } from '../../../../core/logic/UseCase';
import { User } from '../../../../domain/entities/user';
import { IUserRepo } from '../../../../domain/repositories/userRepo';
import { RegisterErrors } from './RegisterErrors';
import { RegisterRequestDto } from './RegisterRequestDto';
import PasswordService from '../../../../shared/services/auth/auth.service';
type Response = Either<AppError.UnexpectedError, Result<any>>;
export class RegisterUseCase
  implements UseCase<RegisterRequestDto, Promise<Response>>
{
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }
  public execute = async (request: RegisterRequestDto): Promise<Response> => {
    try {
      if (!request.password)
        return left(
          new RegisterErrors.UserIsNotValidError('password required')
        ) as Response;
      const encryptedPassword = PasswordService.hashPassword(request.password);
      //validate format user
      const userOrError = User.create({
        userName: request.userName,
        email: request.email,
        password: encryptedPassword,
        imagePath: request.imagePath,
        role: request.role
      });

      if (userOrError.isFailure) {
        const errorMessage = userOrError.error as string;
        return left(
          new RegisterErrors.UserIsNotValidError(errorMessage)
        ) as Response;
      }
      const user = await this.userRepo.save(userOrError.getValue());
      return right(Result.ok(user));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  };
}
