import { BaseController } from '../../../../core/logic/BaseController';
import { GetPostByIdUseCase } from './GetPostByIdUseCase';
import { logger } from '../../../../shared/utils/logger';
import { HttpRequestDto } from '../../../../infra/http/HttpRequest';
import { Post } from '../../../../domain/entities/post';

export class GetPostByIdController extends BaseController {
  private useCase: GetPostByIdUseCase;
  constructor(useCase: GetPostByIdUseCase) {
    super();
    this.useCase = useCase;
  }
  public getPostById = async (
    req: HttpRequestDto,
    res: Express.Response
  ): Promise<any> => {
    await logger.info(`Get post by id`);
    const dto = {
      id: req.params.id
    };
    try {
      const result = await this.useCase.execute(dto);
      if (result.isLeft()) {
        const error = result.value;
        return this.fail(res, error.errorValue().message);
      }
      const post = result.value.getValue();
      return this.ok<Post>(res, post);
    } catch (err) {
      return this.fail(res, err);
    }
  };
}
