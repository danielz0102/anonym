import express from 'express'
import { rootRouter } from './routers/rootRouter.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))

app.use('/', rootRouter)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
