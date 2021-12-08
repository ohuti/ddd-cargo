export class GenerateTrackingId {
    static execute (): string {
        const now = new Date().getTime()

        return `BRC${now}`
    }
}