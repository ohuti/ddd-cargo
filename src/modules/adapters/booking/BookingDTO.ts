export interface GetDeliveryDateAndCostsDTO {
    originLocationId: string
    destinationLocationId: string
}

export interface DeliveryDateAndCostsDTO {
    deliveryCost: number
    estimatedDeliveryDate: number
}

export interface RegisterCargoDTO {
    senderId: string
    destinationId: string
    originId: string
    deliveryEstimate: number
    deliveryCost: number
}