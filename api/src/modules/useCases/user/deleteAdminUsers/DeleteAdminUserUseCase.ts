import { AppError } from '../../../../core/logic/AppError';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { UseCase } from '../../../../core/logic/UseCase';
import { IUserRepo } from '../../../../domain/repositories/userRepo';
type Response = Either<AppError.UnexpectedError, Result<boolean>>;
export class DeleteAdminUserUseCase
  implements UseCase<number, Promise<Response>>
{
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }
  public execute = async (id: number): Promise<Response> => {
    try {
      const result = await this.userRepo.deleteUserById(id);
      return right(Result.ok<boolean>(result));
    } catch (err) {
      return left(new AppError.UnexpectedError(err.message));
    }
  };
}
