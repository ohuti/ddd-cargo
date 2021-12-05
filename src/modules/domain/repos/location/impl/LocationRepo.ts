import { Location } from '@locationDomain/Location'
import { ILocationRepo } from '../ILocationRepo'
import { LocationMapper } from '@adapters/location/LocationMapper'
import { LocationResultDTO } from '@adapters/location/LocationDTO'

const locationList = [
    { id: 'SP', name: 'São Paulo', uf: 'SP', lat: -23.5477336, lon: -46.6371437 },
    { id: 'RJ', name: 'Rio de Janeiro', uf: 'RJ', lat: -22.9111539, lon: -43.2044211 },
    { id: 'DF', name: 'Brasília', uf: 'DF', lat: -15.7797200, lon: -47.9297200 },
]

export default class LocationRepo implements ILocationRepo {
    async listAll(): Promise<LocationResultDTO[]> {
        return locationList.map(location => LocationMapper.toDTO(location))
    }
    async exists(t: Location): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    async delete(t: Location): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async getById(id: string): Promise<Location> {
        return LocationMapper.toDomain(locationList.find(location => id === location.id))
    }
    async save(t: Location): Promise<any> {
        throw new Error('Method not implemented.');
    }   
}
