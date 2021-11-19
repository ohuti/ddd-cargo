import { v4 as uuid } from 'uuid'

const isEntity = (value: any): value is Entity<any> => {
    return value instanceof Entity
}

export abstract class Entity<T> {
    protected readonly _id: string
    protected props: T

    constructor(props: T, id?: string) {
        this._id = id ? id : uuid()
        this.props = props
    }

    equals(entity?: Entity<T>): boolean {
        if (entity === null || entity === undefined) {
            return false
        }

        if (this === entity) {
            return true
        }

        if (!isEntity(entity)) {
            return false
        }

        return this._id === entity._id
    }
}
