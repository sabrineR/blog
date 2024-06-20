import { BaseController } from '../../../../core/logic/BaseController';
export { DeleteAdminUserUseCase } from './DeleteAdminUserUseCase';
import { logger } from '../../../../shared/utils/logger';
import { DeleteAdminUserUseCase } from './DeleteAdminUserUseCase';

export class DeleteAdminController extends BaseController {
  private useCase: DeleteAdminUserUseCase;
  constructor(useCase: DeleteAdminUserUseCase) {
    super();
    this.useCase = useCase;
  }
  public deleteUser = async (req: any, res: Express.Response): Promise<any> => {
    await logger.info(`Delete user`);
    try {
      const result = await this.useCase.execute(req.params.id);
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
