import { BaseController } from '../../../../core/logic/BaseController';
import { LoginUseCase } from './LoginUseCae';
import { HttpRequestDto } from '../../../../infra/http/HttpRequest';
import { LoginRequestDto } from './LoginRequestDto';
import { logger } from '../../../../shared/utils/logger';
import { LoginErrors } from './LoginErros';
import { LoginResponseDto } from './LoginResponseDto';

export class LoginController extends BaseController {
  private useCase: LoginUseCase;
  constructor(useCase: LoginUseCase) {
    super();
    this.useCase = useCase;
  }
  public login = async (
    req: HttpRequestDto,
    res: Express.Response
  ): Promise<any> => {
    await logger.info(`signin User`);
    const dto: LoginRequestDto = {
      email: req.body.email,
      password: req.body.password
    };
    try {
      const result = await this.useCase.execute(dto);
      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case LoginErrors.LoginIsNotValidError:
            return this.fail(res, error.errorValue().message);
          default:
            return this.fail(res, 'unexpected error');
        }
      } else {
        const { token, userId, imagePath, isAdmin } = result.value.getValue();
        return this.created<LoginResponseDto>(res, {
          token,
          userId,
          imagePath,
          isAdmin
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  };
}
