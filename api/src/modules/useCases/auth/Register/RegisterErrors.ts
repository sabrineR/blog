import { Result } from '../../../../core/logic/Result';
import { UseCaseError } from '../../../../core/logic/UseCaseError';

export namespace RegisterErrors {
  export class UserIsNotValidError extends Result<UseCaseError> {
    constructor(error: string) {
      super(false, {
        message: `User validation failed ${error}`
      } as UseCaseError);
    }
  }
}
