import { BaseController } from '../../../../core/logic/BaseController';
import { DeletePostUserUseCase } from './DeletePostUserUseCase';
import { HttpRequestDto } from '../../../../infra/http/HttpRequest';
import { logger } from '../../../../shared/utils/logger';

interface DeletePostUserRequestDto {
  id: number;
  userId: number;
}
export class DeletePostUserController extends BaseController {
  private useCase: DeletePostUserUseCase;
  constructor(useCase: DeletePostUserUseCase) {
    super();
    this.useCase = useCase;
  }
  public deletePost = async (
    req: HttpRequestDto,
    res: Express.Response
  ): Promise<any> => {
    await logger.info(`delete post user`);
    const dto: DeletePostUserRequestDto = {
      id: req.params.id,
      userId: req.user.id
    };
    try {
      const result = await this.useCase.execute(dto);
      if (result.isLeft()) {
        const error = result.value;
        return this.fail(res, error.errorValue().message);
      }
      const isDeleted = result.value.getValue();
      return this.updated<any>(res, { isDeleted });
    } catch (err) {
      return this.fail(res, err);
    }
  };
}
