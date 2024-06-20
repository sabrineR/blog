import { BaseController } from '../../../../core/logic/BaseController';
import { GetAdminUsersUseCase } from './GetAdminUsersUseCase';
import { HttpRequestDto } from '../../../../infra/http/HttpRequest';
import { logger } from '../../../../shared/utils/logger';
import { ResponseUsers } from './GetAdminUsersResponse';

export class GetAdminUsersController extends BaseController {
  private useCase: GetAdminUsersUseCase;
  constructor(useCase: GetAdminUsersUseCase) {
    super();
    this.useCase = useCase;
  }
  public getUsers = async (
    req: HttpRequestDto,
    res: Express.Response
  ): Promise<any> => {
    await logger.info(`Get list Users for admin`);
    try {
      const result = await this.useCase.execute();
      if (result.isLeft()) {
        const error = result.value;
        return this.fail(res, error.errorValue().message);
      }
      const users = result.value.getValue();
      return this.ok<ResponseUsers>(res, users);
    } catch (err) {
      return this.fail(res, err);
    }
  };
}
