import { CargoMapper } from '@adapters/cargo/CargoMapper'
import { Cargo } from '@domainModels/cargo/Cargo'
import { ICargoRepo } from '../ICargoRepo'

const persistedCargos: any[] = []

export class CargoRepo implements ICargoRepo {
    async exists(cargo: Cargo): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    async delete(cargo: Cargo): Promise<any> {
        throw new Error('Method not implemented.')
    }
    async getById(id: string): Promise<Cargo> {
        const persistedCargo = persistedCargos.find(persistedCargo => persistedCargo.id === id) ?? null

        if(!persistedCargo) return persistedCargo

        return CargoMapper.toDomain(persistedCargo)
    }
    async save(cargo: Cargo): Promise<any> {
        const cargoToPersist = CargoMapper.toPersistence(cargo)

        persistedCargos.push(cargoToPersist)

        return 'ok'
    }
}
