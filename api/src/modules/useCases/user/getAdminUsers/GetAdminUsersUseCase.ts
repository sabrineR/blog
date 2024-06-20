import { AppError } from '../../../../core/logic/AppError';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { UseCase } from '../../../../core/logic/UseCase';
import { IUserRepo } from '../../../../domain/repositories/userRepo';
import { ResponseUsers } from './GetAdminUsersResponse';

type Response = Either<AppError.UnexpectedError, Result<ResponseUsers>>;
export class GetAdminUsersUseCase implements UseCase<any, Promise<Response>> {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }
  public execute = async (): Promise<Response> => {
    try {
      const users = await this.userRepo.getUsers();
      return right(Result.ok<ResponseUsers>(users));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  };
}
