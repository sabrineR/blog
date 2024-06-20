import { BaseController } from '../../../../core/logic/BaseController';
import { GetPostsUseCase } from './GetPostsUseCase';
import { logger } from '../../../../shared/utils/logger';
import { ResponsePosts } from './GetPostsResponse';

export class GetPostsController extends BaseController {
  private useCase: GetPostsUseCase;
  constructor(useCase: GetPostsUseCase) {
    super();
    this.useCase = useCase;
  }
  public getPosts = async (
    req: Express.Request,
    res: Express.Response
  ): Promise<any> => {
    await logger.info(`Get list post`);
    try {
      const result = await this.useCase.execute();
      if (result.isLeft()) {
        const error = result.value;
        return this.fail(res, error.errorValue().message);
      }
      const posts = result.value.getValue();
      return this.ok<ResponsePosts>(res, posts);
    } catch (err) {
      return this.fail(res, err);
    }
  };
}
