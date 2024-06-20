import { BaseController } from '../../../../core/logic/BaseController';
import { GetActiveUsersCommentsUseCase } from './GetActiveUsersCommentsUseCase';
import { logger } from '../../../../shared/utils/logger';
import { HttpRequestDto } from '../../../../infra/http/HttpRequest';
import { UserWithPosts } from './interfaces';

export class GetActiveUsersCommentsController extends BaseController {
  private useCase: GetActiveUsersCommentsUseCase;
  constructor(useCase: GetActiveUsersCommentsUseCase) {
    super();
    this.useCase = useCase;
  }
  public getActiveUsersComments = async (
    req: HttpRequestDto,
    res: Express.Response
  ): Promise<any> => {
    await logger.info(`Get last activities users in 24 hours`);

    try {
      const result = await this.useCase.execute();
      if (result.isLeft()) {
        const error = result.value;
        return this.fail(res, error.errorValue().message);
      }
      const comment = result.value.getValue();
      return this.ok<UserWithPosts[]>(res, comment);
    } catch (err) {
      return this.fail(res, err);
    }
  };
}
