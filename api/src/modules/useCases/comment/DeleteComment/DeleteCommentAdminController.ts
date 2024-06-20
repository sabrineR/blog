import { BaseController } from '../../../../core/logic/BaseController';
import { DeleteCommentAdminUseCase } from './DeleteCommentAdminUseCase';
import { HttpRequestDto } from '../../../../infra/http/HttpRequest';
import { logger } from '../../../../shared/utils/logger';

interface DeleteCommentAdminRequestDto {
  id: number;
}
export class DeleteCommentAdminController extends BaseController {
  private useCase: DeleteCommentAdminUseCase;
  constructor(useCase: DeleteCommentAdminUseCase) {
    super();
    this.useCase = useCase;
  }
  public deleteCommentAdmin = async (
    req: HttpRequestDto,
    res: Express.Response
  ): Promise<any> => {
    await logger.info(`delete comment admin`);
    const dto: DeleteCommentAdminRequestDto = {
      id: req.params.id
    };
    try {
      const result = await this.useCase.execute(dto);
      if (result.isLeft()) {
        const error = result.value;
        return this.fail(res, error.errorValue().message);
      }
      const isDeleted = result.value.getValue();
      return this.deleted<any>(res, isDeleted);
    } catch (err) {
      return this.fail(res, err);
    }
  };
}
