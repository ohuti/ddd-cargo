import { Mapper } from '@shared/core/Mapper'

import { Location } from '@domain/models/location/Location'
import { ILocationRepo } from '../ILocationRepo'
import { LocationMapper } from '@adapters/location/LocationMapper'
import { LocationResultDTO } from '@adapters/location/LocationDTO'

const locationList = [
    { id: 'SP', name: 'São Paulo', uf: 'SP', lat: -23.5477336, lon: -46.6371437 },
    { id: 'RJ', name: 'Rio de Janeiro', uf: 'RJ', lat: -22.9111539, lon: -43.2044211 },
    { id: 'DF', name: 'Brasília', uf: 'DF', lat: -15.7797200, lon: -47.9297200 },
]

export default class LocationRepo implements ILocationRepo {
    mapper: Mapper<Location>
    
    constructor() {
        this.mapper = new LocationMapper()
    }

    async listAll(): Promise<LocationResultDTO[]> {
        return locationList.map(location => this.mapper.toDTO(location))
    }
    async exists(t: Location): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    async delete(t: Location): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async getById(id: string): Promise<Location> {
        return this.mapper.toDomain(locationList.find(location => id === location.id))
    }
    async save(t: Location): Promise<any> {
        throw new Error('Method not implemented.');
    }   
}
