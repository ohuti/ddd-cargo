import { Mapper } from '@shared/core/Mapper'
import { Location } from '@domain/models/location/Location'
import { LocationResultDTO } from './LocationDTO'

export class LocationMapper implements Mapper<Location> {
    toDomain(data: any): Location {
        const location = Location.create({
            name: data.name,
            uf: data.uf,
            lat: data.lat,
            lon: data.lon
        }, data.id)

        return location.getValue()
    }
    toDTO(object: Location): LocationResultDTO {
        return {
            locationId: object.id,
            name: object.name,
            uf: object.uf
        }
    }
    toPersistence(object: Location): any {
        return {
            id: object.id,
            name: object.name,
            uf: object.uf,
            lat: object.lat,
            lon: object.lon
        }
    }
}