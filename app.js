import express from 'express'
import { rootRouter } from './routers/rootRouter.js'
import { handleError } from '#middlewares/handleError.js'
import { render404 } from '#middlewares/render404.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))

app.use('/', rootRouter)
app.use(render404)
app.use(handleError)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
