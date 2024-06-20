import { BaseController } from '../../../../core/logic/BaseController';
import { RegisterUseCase } from './RegisterUseCase';
import { HttpRequestDto } from '../../../../infra/http/HttpRequest';
import { RegisterRequestDto } from './RegisterRequestDto';
import { logger } from '../../../../shared/utils/logger';
import { RegisterErrors } from './RegisterErrors';
import { RegisterResponseDto } from './RegisterResponseDto';
export class RegisterController extends BaseController {
  private useCase: RegisterUseCase;
  constructor(useCase: RegisterUseCase) {
    super();
    this.useCase = useCase;
  }
  public signup = async (
    req: HttpRequestDto,
    res: Express.Response
  ): Promise<any> => {
    await logger.info(`Signup User`);
    const dto: RegisterRequestDto = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      imagePath: req.body.imagePath,
      role: req.body.role
    };
    try {
      const result = await this.useCase.execute(dto);
      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case RegisterErrors.UserIsNotValidError:
            return this.fail(res, error.errorValue().message);
          default:
            return this.fail(res, 'unexpected error');
        }
      } else {
        const id = result.value.getValue();
        return this.created<RegisterResponseDto>(res, { id });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  };
}
