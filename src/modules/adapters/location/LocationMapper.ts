import { Mapper } from '@shared/core/Mapper'
import { Location } from '@domainModels/location/Location'
import { LocationResultDTO } from './LocationDTO'

export class LocationMapper implements Mapper {
    static toDomain(raw: any): Location {
        const location = Location.create({
            name: raw.name,
            uf: raw.uf,
            lat: raw.lat,
            lon: raw.lon
        }, raw.id)

        return location.getValue()
    }
    static toDTO(location: Location): LocationResultDTO {
        return {
            locationId: location.id,
            name: location.name,
            uf: location.uf
        }
    }
    static toPersistence(location: Location): any {
        return {
            id: location.id,
            name: location.name,
            uf: location.uf,
            lat: location.lat,
            lon: location.lon
        }
    }
}