import { Location } from '@domain/models/location/Location'
import { Result } from '@shared/core/Result'

const MAX_DISTANCE = 5923
const VEHICLE_EFFICIENCY = 10 // km per Litre
const GAS_PRICE = 6 // in Brazilian Real
const DISTANCE_PER_DAY = 150 // km per day

const degreeToRadian = (degree: number) => {
    const factor = (Math.PI / 180)
    const rad = degree/factor

    return rad
}

const findDistanceBetween = (origin: Location, destination: Location) => {
    const earthRadius = 6371

    const originLat = degreeToRadian(origin.lat)
    const originLon = degreeToRadian(origin.lon)

    const destinationLat = degreeToRadian(destination.lat)
    const destinationLon = degreeToRadian(destination.lon)

    const deltaLat = (destinationLat - originLat) / 2
    const deltaLon = (destinationLon - originLon) / 2

    const a = (Math.pow(Math.sin((deltaLat)), 2) + Math.cos(originLat)) * Math.cos(destinationLat) * Math.pow(Math.sin(deltaLon), 2)
    const b = 2 * (1 / Math.tan(Math.sqrt(a) / Math.sqrt(1 - a)))

    return earthRadius * b
}

const getDeliveryCost = (distance: number) => (distance * GAS_PRICE) / VEHICLE_EFFICIENCY
const getEstimatedDeliveryDate = (distance: number) => Math.ceil(distance / DISTANCE_PER_DAY) + 1

const calculateDeliveryDateAndPrice = (origin: Location, destination: Location): Result<any> => {
    const distance = findDistanceBetween(origin, destination)

    if (distance > MAX_DISTANCE) {
        return Result.fail('Sorry, we cannot deliver your package this far. But we are working on it!')
    }

    const deliveryCost = getDeliveryCost(distance)
    const estimatedDeliveryDate = getEstimatedDeliveryDate(distance)

    return Result.ok({
        deliveryCost,
        estimatedDeliveryDate
    })
}


export { calculateDeliveryDateAndPrice }