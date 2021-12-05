import { Mapper } from '@shared/core/Mapper'
import { Location } from '@locationDomain/Location'
import { LocationResultDTO } from './LocationDTO'

export class LocationMapper implements Mapper {
    static toDomain(data: any): Location {
        const location = Location.create({
            name: data.name,
            uf: data.uf,
            lat: data.lat,
            lon: data.lon
        }, data.id)

        return location.getValue()
    }
    static toDTO(object: any): LocationResultDTO {
        return {
            locationId: object.id,
            name: object.name,
            uf: object.uf
        }
    }
    static toPersistence(object: Location): any {
        return {
            id: object.id,
            name: object.name,
            uf: object.uf,
            lat: object.lat,
            lon: object.lon
        }
    }
}