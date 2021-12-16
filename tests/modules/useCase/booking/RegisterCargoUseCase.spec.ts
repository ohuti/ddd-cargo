import { RegisterCargoDTO } from '@adapters/booking/BookingDTO'
import { RegisterCargoUseCase } from '@useCases/booking/registerCargo/RegisterCargoUseCase'
import MockedCargoRepo from '../../mockedRepo/MockedCargoRepo'
import MockedLocationRepo from '../../mockedRepo/MockedLocationRepo'
import { MockedUserRepo } from '../../mockedRepo/MockedUserRepo'

let registerCargoUseCase: RegisterCargoUseCase

beforeAll(() => {
    const cargoRepo = new MockedCargoRepo()
    const locationRepo = new MockedLocationRepo()
    const userRepo = new MockedUserRepo()

    registerCargoUseCase = new RegisterCargoUseCase(cargoRepo, locationRepo, userRepo)
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
