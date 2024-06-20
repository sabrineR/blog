import { BaseController } from '../../../../core/logic/BaseController';
import { UpdateCommentUseCase } from './UpdateCommentUseCase';
import { HttpRequestDto } from '../../../../infra/http/HttpRequest';
import { UpdateCommentRequestDto } from './UpdateCommentRequestDto';
import { logger } from '../../../../shared/utils/logger';

export class UpdateCommentController extends BaseController {
  private useCase: UpdateCommentUseCase;
  constructor(useCase: UpdateCommentUseCase) {
    super();
    this.useCase = useCase;
  }
  public updateComment = async (
    req: HttpRequestDto,
    res: Express.Response
  ): Promise<any> => {
    await logger.info(`update Comment`);
    const dto: UpdateCommentRequestDto = {
      id: req.params.id,
      userId: req.user.id,
      postId: req.body.postId,
      content: req.body.content
    };
    try {
      const result = await this.useCase.execute(dto);
      if (result.isLeft()) {
        const error = result.value;
        return this.fail(res, error.errorValue().message);
      }
      const id = result.value.getValue();
      return this.updated<any>(res, { id });
    } catch (err) {
      return this.fail(res, err);
    }
  };
}
