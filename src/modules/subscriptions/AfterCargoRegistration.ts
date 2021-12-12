import { AddHandlingEventDTO } from '@adapters/incidentRegister/IncidentRegisterDTO'
import { CargoRegistered } from '@domainModels/cargo/events/CargoRegistered'
import { IHandle } from '@shared/core/IHandle'
import { DomainEvents } from '@shared/domain/DomainEvents'
import { AddHandlingEventUseCase } from '@useCases/incidentRegister/addHandlingEvent/AddHandlingEventUseCase'

export class AfterCargoRegistration implements IHandle<CargoRegistered> {
    private addHandlingEvent: AddHandlingEventUseCase

    constructor(addHandlingEvent: AddHandlingEventUseCase) {
        this.setupSubscriptions()
        this.addHandlingEvent = addHandlingEvent
    }

    setupSubscriptions() {
        DomainEvents.register(this.addHandlingEventOnCargoRegistered.bind(this), CargoRegistered.name)
    }

    private async addHandlingEventOnCargoRegistered(event: CargoRegistered): Promise<void> {
        const { cargo } = event

        const dto: AddHandlingEventDTO = {
            cargoId: cargo.id,
            description: 'Cargo registered in post office!',
            occurredAt: new Date().getTime()
        }

        try {
            await this.addHandlingEvent.execute(dto)
            console.log('[AfterCargoRegistration]: addHandlingEventOnCargoRegistered execute successfully')
        } catch (error) {
            console.error('[AfterCargoRegistration]: Something went wrong while trying to addHandlingEventOnCargoRegistered')
        }
    }
}
