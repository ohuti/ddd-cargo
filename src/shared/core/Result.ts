export class Result<T> {
    isSuccess: boolean
    isFailure: boolean
    error: T | string
    private _value: T | null
    
    constructor (isSuccess: boolean, error?: T | string, value?: T) {
        if (isSuccess && error) {
            throw new Error("InvalidOperation: A result cannot be successful and contain an error")
        }
        if (!isSuccess && !error) {
            throw new Error("InvalidOperation: A failing result needs to contain an error message")
        }
        
        this.isSuccess = isSuccess
        this.isFailure = !isSuccess
        this.error = error ?? 'Erro não especificado'
        this._value = value ?? null
        
        Object.freeze(this)
    }
    
    getValue () : T {
        if (!this.isSuccess) {
            throw new Error("Can't get the value of an error result. Use 'errorValue' instead.")
        }
        
        if (this._value === null) {
            throw new Error("Can't get the value of an empty result.")
        }
        
        return this._value
    }
    
    errorValue (): T {
        return this.error as T
    }
    
    static ok<U> (value?: U) : Result<U> {
        return new Result<U>(true, '', value)
    }
    
    static fail<U> (error: string): Result<U> {
        return new Result<U>(false, error)
    }
    
    public static combine (results: Result<any>[]) : Result<any> {
        const errors: string[] = []

        for (let result of results) {
            if (result.isFailure) errors.push(result.error)
        }

        if (errors.length > 0) {
            return new Result(false, errors)
        }

        return Result.ok()
    }
}