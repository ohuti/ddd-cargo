interface Mapper<T> {
    toDomain(data: any): T
    toDTO(object: T): any
}