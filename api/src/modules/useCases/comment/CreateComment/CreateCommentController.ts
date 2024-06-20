import { BaseController } from '../../../../core/logic/BaseController';
import { CreateCommentUseCase } from './CreateCommentUseCase';
import { HttpRequestDto } from '../../../../infra/http/HttpRequest';
import { CommentRequestDto } from './CommentRequestDto';
import { logger } from '../../../../shared/utils/logger';

export class CreateCommentController extends BaseController {
  private useCase: CreateCommentUseCase;
  constructor(useCase: CreateCommentUseCase) {
    super();
    this.useCase = useCase;
  }
  public createComment = async (
    req: HttpRequestDto,
    res: Express.Response
  ): Promise<any> => {
    await logger.info(`create new Comment`);
    const dto: CommentRequestDto = {
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
      return this.created<any>(res, { id });
    } catch (err) {
      return this.fail(res, err);
    }
  };
}
