import { BaseController } from '../../../../core/logic/BaseController';
import { UpdatePostUseCase } from './UpdatePostUseCase';
import { HttpRequestDto } from '../../../../infra/http/HttpRequest';
import { UpdatePostRequestDto } from './UpdatePostRequestDto';
import { logger } from '../../../../shared/utils/logger';

export class UpdatePostController extends BaseController {
  private useCase: UpdatePostUseCase;
  constructor(useCase: UpdatePostUseCase) {
    super();
    this.useCase = useCase;
  }
  public updatePost = async (
    req: HttpRequestDto,
    res: Express.Response
  ): Promise<any> => {
    await logger.info(`update post`);
    const dto: UpdatePostRequestDto = {
      id: req.params.id,
      userId: req.user.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: req.body.imagePath
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
