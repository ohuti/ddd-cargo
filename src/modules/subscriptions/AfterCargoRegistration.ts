import { AddHandlingEventDTO } from '@adapters/incidentRegister/IncidentRegisterDTO'
import { CargoRegistered } from '@domainModels/cargo/events/CargoRegistered'
import { IHandle } from '@shared/core/IHandle'
import { DomainEvents } from '@shared/domain/DomainEvents'
import { AddHandlingEventUseCase } from '@useCases/incidentRegister/addHandlingEvent/AddHandlingEventUseCase'
import { Slack } from 'modules/infrastructure/slack/Slack'

export class AfterCargoRegistration implements IHandle<CargoRegistered> {
    private addHandlingEvent: AddHandlingEventUseCase

    constructor(addHandlingEvent: AddHandlingEventUseCase) {
        this.setupSubscriptions()
        this.addHandlingEvent = addHandlingEvent
    }

    setupSubscriptions() {
        DomainEvents.register(this.addHandlingEventOnCargoRegistered.bind(this), CargoRegistered.name)
        DomainEvents.register(this.sendSlackMessageOnCargoRegistered.bind(this), CargoRegistered.name)
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

    private async sendSlackMessageOnCargoRegistered (event: CargoRegistered): Promise<void> {
        const { cargo } = event
        const userRole = cargo.usersRoles.find(userRole => userRole.role === 'sender')

        try {
            const channelId = process.env.channelId
            const message = `Novo pacote registrado para envio com id de rastreio ${cargo.trackingId.value}.\nCaso precise entrar em contato com o remetente, use o e-mail ${userRole.user.email}`

            await Slack.sendMessageToChannel(channelId, message)
            console.log('[AfterCargoRegistration - Slack]: Message sent successfully')
        } catch (error) {
            console.log(`[AfterCargoRegistration - Slack]: Error when trying to send message: ${error}`)
        }
    }
}
