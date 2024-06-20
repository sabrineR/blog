import { Result } from '../../../../core/logic/Result';
import { UseCaseError } from '../../../../core/logic/UseCaseError';

export namespace LoginErrors {
  export class LoginIsNotValidError extends Result<UseCaseError> {
    constructor(error: string) {
      super(false, {
        message: `Login failed ${error}`
      } as UseCaseError);
    }
  }
}
