import { BaseController } from '../../../../core/logic/BaseController';
import { DeleteCommentUserUseCase } from './DeleteCommentUserUseCase';
import { HttpRequestDto } from '../../../../infra/http/HttpRequest';
import { logger } from '../../../../shared/utils/logger';

interface DeleteCommentUserRequestDto {
  id: number;
  userId: number;
}
export class DeleteCommentUserController extends BaseController {
  private useCase: DeleteCommentUserUseCase;
  constructor(useCase: DeleteCommentUserUseCase) {
    super();
    this.useCase = useCase;
  }
  public deleteComment = async (
    req: HttpRequestDto,
    res: Express.Response
  ): Promise<any> => {
    await logger.info(`delete comment user`);
    const dto: DeleteCommentUserRequestDto = {
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
      return this.deleted<any>(res, { isDeleted });
    } catch (err) {
      return this.fail(res, err);
    }
  };
}
