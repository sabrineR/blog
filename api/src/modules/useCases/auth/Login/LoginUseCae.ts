import { AppError } from '../../../../core/logic/AppError';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { UseCase } from '../../../../core/logic/UseCase';
import { User } from '../../../../domain/entities/user';
import { IUserRepo } from '../../../../domain/repositories/userRepo';
import { LoginErrors } from './LoginErros';
import { LoginRequestDto } from './LoginRequestDto';
import PasswordService from '../../../../shared/services/auth/auth.service';
type Response = Either<AppError.UnexpectedError, Result<any>>;
export class LoginUseCase
  implements UseCase<LoginRequestDto, Promise<Response>>
{
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }
  public execute = async (request: LoginRequestDto): Promise<Response> => {
    try {
      const { email, password } = request;
      if (!email || !password) {
        return left(
          new LoginErrors.LoginIsNotValidError(
            'username and password fields cannot be empty'
          )
        ) as Response;
      }
      const validUser = await this.userRepo.login(email);
      const validPassword = PasswordService.compare(
        password,
        validUser.password
      );
      if (!validPassword) {
        return left(
          new LoginErrors.LoginIsNotValidError(
            'Login faild : password incorrect'
          )
        ) as Response;
      }
      const token = PasswordService.generateToken({
        id: validUser.id,
        isAdmin: validUser.role
      });
      return right(
        Result.ok({
          token,
          userId: validUser.id,
          imagePath: validUser.imagePath,
          isAdmin: validUser.role
        })
      );
    } catch (err) {
      return left(new LoginErrors.LoginIsNotValidError(err.message));
    }
  };
}
