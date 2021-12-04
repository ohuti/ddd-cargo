interface Mapper<T> {
    toDomain(data: any): T
    toDTO(data: any): any
    toPersistence(object: T): void
}
