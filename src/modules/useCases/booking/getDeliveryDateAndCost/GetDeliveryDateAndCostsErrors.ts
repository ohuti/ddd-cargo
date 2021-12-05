import { Result } from '@shared/core/Result'
import { UseCaseError } from '@shared/core/UseCaseError'

export namespace GetDeliveryDateAndCostsErrorsErrors {
    export class DistanceTooFar extends Result<UseCaseError> {
        constructor(message: any) {
            super(false, { message })
        }
    }
}
