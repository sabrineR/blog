import { BaseController } from '../../../../core/logic/BaseController';
import { GetCommentsUseCase } from './GetCommentsUseCase';
import { logger } from '../../../../shared/utils/logger';
import { ResponseComments } from './GetCommentsResponse';

export class GetCommentsController extends BaseController {
  private useCase: GetCommentsUseCase;
  constructor(useCase: GetCommentsUseCase) {
    super();
    this.useCase = useCase;
  }
  public getComments = async (
    req: Express.Request,
    res: Express.Response
  ): Promise<any> => {
    await logger.info(`Get list comment`);
    try {
      const result = await this.useCase.execute();
      if (result.isLeft()) {
        const error = result.value;
        return this.fail(res, error.errorValue().message);
      }
      const comments = result.value.getValue();
      return this.ok<ResponseComments>(res, comments);
    } catch (err) {
      return this.fail(res, err);
    }
  };
}
