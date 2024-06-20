import { Result } from './Result';
import { UseCaseError } from './UseCaseError';

export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError> {
    constructor(error: string) {
      super(false, {
        message: error
      } as UseCaseError);
    }
  }
}
