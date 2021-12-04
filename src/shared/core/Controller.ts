import express from 'express'

export abstract class Controller {
    protected abstract executeImpl (req: express.Request, res: express.Response): Promise<any>
    
    async execute(req: express.Request, res: express.Response): Promise<void> {
        try {
            await this.executeImpl(req, res)
        } catch (error) {
            console.error('[BaseController]: Uncaught controller error')
            console.error(error)
            this.fail(res, error as any)
        }

        return
    }
    
    ok<T> (res: express.Response, dto?: T) {
        if (!!dto) {
            return res.status(200).json(dto)
        } else {
            return res.status(200).json({ message: 'OK' })
        }
    }
    
    created (res: express.Response) {
        return res.sendStatus(201)
    }

    fail (res: express.Response, error: Error | string) {
        return res.status(500).json({
            message: error.toString()
        })
    }

    static jsonResponse(res: express.Response, code: number, message: string) {
        return res.status(code).json({ message })
    }
    
    public clientError (res: express.Response, message?: string) {
        return Controller.jsonResponse(res, 400, message ? message : 'Bad Request')
    }
    
    public unauthorized (res: express.Response, message?: string) {
        return Controller.jsonResponse(res, 401, message ? message : 'Unauthorized')
    }
    
    public paymentRequired (res: express.Response, message?: string) {
        return Controller.jsonResponse(res, 402, message ? message : 'Payment required')
    }
    
    public forbidden (res: express.Response, message?: string) {
        return Controller.jsonResponse(res, 403, message ? message : 'Forbidden')
    }
    
    public notFound (res: express.Response, message?: string) {
        return Controller.jsonResponse(res, 404, message ? message : 'Not found')
    }
    
    public conflict (res: express.Response, message?: string) {
        return Controller.jsonResponse(res, 409, message ? message : 'Conflict')
    }
    
    public tooMany (res: express.Response, message?: string) {
        return Controller.jsonResponse(res, 429, message ? message : 'Too many requests')
    }
    
    public todo (res: express.Response) {
        return Controller.jsonResponse(res, 400, 'TODO')
    }
}