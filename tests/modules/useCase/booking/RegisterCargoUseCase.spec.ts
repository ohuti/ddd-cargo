import { RegisterCargoDTO } from '@adapters/booking/BookingDTO'
import { RegisterCargoUseCase } from '@useCases/booking/registerCargo/RegisterCargoUseCase'
import MockedCargoRepo from '../../mockedRepo/MockedCargoRepo'
import MockedLocationRepo from '../../mockedRepo/MockedLocationRepo'

let registerCargoUseCase: RegisterCargoUseCase

beforeAll(() => {
    const cargoRepo = new MockedCargoRepo()
    const locationRepo = new MockedLocationRepo()

    registerCargoUseCase = new RegisterCargoUseCase(cargoRepo, locationRepo)
})

test('Registering new Cargo', async () => {
    const dto: RegisterCargoDTO = {
        senderId: '1',
        originId: 'SP',
        destinationId: 'RJ',
        deliveryCost: 300.45,
        deliveryEstimate: 5
    }

    const cargoOrError = await registerCargoUseCase.execute(dto)

    expect(cargoOrError.isRight()).toBe(true)
})
