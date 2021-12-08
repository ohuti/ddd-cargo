import { Location } from '@domainModels/location/Location'
import { ILocationRepo } from '@repos/location/ILocationRepo'
import { LocationMapper } from '@adapters/location/LocationMapper'

const locationList = [
    { id: 'SP', name: 'São Paulo', uf: 'SP', lat: -23.5477336, lon: -46.6371437 },
    { id: 'RJ', name: 'Rio de Janeiro', uf: 'RJ', lat: -22.9111539, lon: -43.2044211 },
    { id: 'DF', name: 'Brasília', uf: 'DF', lat: -15.7797200, lon: -47.9297200 },
]

export default class MockedLocationRepo implements ILocationRepo {
    async listAll(): Promise<Location[]> {
        return locationList.map(location => LocationMapper.toDomain(location))
    }
    async exists(location: Location): Promise<boolean> {
        return locationList.filter(loc => loc.id === location.id).length > 0
    }
    async delete(location: Location): Promise<any> {
        return 'ok'
    }
    async getById(id: string): Promise<Location> {
        return LocationMapper.toDomain(locationList.find(location => id === location.id))
    }
    async save(location: Location): Promise<any> {
        return 'ok'
    }   
}
