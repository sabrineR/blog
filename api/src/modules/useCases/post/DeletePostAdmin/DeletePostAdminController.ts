import { BaseController } from '../../../../core/logic/BaseController';
import { DeletePostAdminUseCase } from './DeletePostAdminUseCase';
import { HttpRequestDto } from '../../../../infra/http/HttpRequest';
import { logger } from '../../../../shared/utils/logger';

interface DeletePostAdminRequestDto {
  id: number;
}
export class DeletePostAdminController extends BaseController {
  private useCase: DeletePostAdminUseCase;
  constructor(useCase: DeletePostAdminUseCase) {
    super();
    this.useCase = useCase;
  }
  public deletePostAdmin = async (
    req: HttpRequestDto,
    res: Express.Response
  ): Promise<any> => {
    logger.info(`delete post admin`);
    const dto: DeletePostAdminRequestDto = {
      id: req.params.id
    };
    try {
      const result = await this.useCase.execute(dto);
      if (result.isLeft()) {
        const error = result.value;
        return this.fail(res, error.errorValue().message);
      }
      const isDeleted = result.value.getValue();
      return this.deleted<any>(res, { isDeleted });
    } catch (err) {
      return this.fail(res, err);
    }
  };
}
