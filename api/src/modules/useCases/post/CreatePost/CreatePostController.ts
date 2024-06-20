import { BaseController } from '../../../../core/logic/BaseController';
import { CreatePostUseCase } from './CreatePostUseCase';
import { HttpRequestDto } from '../../../../infra/http/HttpRequest';
import { PostRequestDto } from './PostRequestDto';
import { logger } from '../../../../shared/utils/logger';

export class CreatePostController extends BaseController {
  private useCase: CreatePostUseCase;
  constructor(useCase: CreatePostUseCase) {
    super();
    this.useCase = useCase;
  }
  public createPost = async (
    req: HttpRequestDto,
    res: Express.Response
  ): Promise<any> => {
    await logger.info(`create new post`);
    const dto: PostRequestDto = {
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
      return this.created<any>(res, { id });
    } catch (err) {
      return this.fail(res, err);
    }
  };
}
