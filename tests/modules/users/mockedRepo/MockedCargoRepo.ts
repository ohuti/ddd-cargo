import { CargoMapper } from "@adapters/cargo/CargoMapper"
import { Cargo } from "@domainModels/cargo/Cargo"
import { ICargoRepo } from "@repos/cargo/ICargoRepo"

const persistedCargos = [{
    id: '1',
    usersRoles: [{ userId: '1', role: 'sender' }],
    trackingId: 'BRC1638967183690',
    deliveryHistory: [{
        cargoId: '1',
        eventDescription: 'Cargo registered on postoffice.',
        occurredAt: 1638967183690
    }],
    deliverySpecification: {
        originId: 'SP',
        destination: 'RJ',
        deliveryEstimate: 300.45,
        deliveryCost: 5
    },
    createdAt: 1638967183690,
    updatedAt: 1638967183690,
    deletedAt: null
}]

export default class MockedCargoRepo implements ICargoRepo {
    async exists(cargo: Cargo): Promise<boolean> {
        throw new Error("Method not implemented.")
    }
    async delete(cargo: Cargo): Promise<any> {
        throw new Error("Method not implemented.")
    }
    async getById(id: string): Promise<Cargo> {
        const persistedCargo = persistedCargos.find(persistedCargo => persistedCargo.id === id) ?? null

        return CargoMapper.toDomain(persistedCargo)
    }
    async save(cargo: Cargo): Promise<any> {
        const cargoToPersist = CargoMapper.toPersistence(cargo)

        persistedCargos.push(cargoToPersist)

        return 'ok'
    }
}
