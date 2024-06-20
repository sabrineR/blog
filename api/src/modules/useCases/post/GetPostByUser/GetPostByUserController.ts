import { BaseController } from '../../../../core/logic/BaseController';
import { GetPostByUserUseCase } from './GetPostByUserUseCase';
import { logger } from '../../../../shared/utils/logger';
import { HttpRequestDto } from '../../../../infra/http/HttpRequest';
import { Post } from '../../../../domain/entities/post';

export class GetPostByUserController extends BaseController {
  private useCase: GetPostByUserUseCase;
  constructor(useCase: GetPostByUserUseCase) {
    super();
    this.useCase = useCase;
  }
  public getPostByUser = async (
    req: HttpRequestDto,
    res: Express.Response
  ): Promise<any> => {
    await logger.info(`Get post by user`);
    const dto = {
      id: req.user.id
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
