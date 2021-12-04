import express from 'express'
import morgan from 'morgan'

import routes from './modules/interfaces/routes'

const app = express()

app.use(express.json())
app.use(morgan('common'))

app.get('/', (req: express.Request, res: express.Response) => { res.json({ status: 'ok' }) })
app.use('/v1', routes)

app.listen(4000, () => console.info('APP running on port 4000'))
