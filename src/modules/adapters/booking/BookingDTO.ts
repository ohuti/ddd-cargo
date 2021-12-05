export interface GetDeliveryDateAndCostsDTO {
    originLocationId: string
    destinationLocationId: string
}

export interface DeliveryDateAndCostsDTO {
    deliveryCost: number
    estimatedDeliveryDate: number
}
