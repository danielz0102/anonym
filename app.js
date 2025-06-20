import express from 'express'
import session from 'express-session'
import passport from 'passport'
import './config/auth.js'

import { rootRouter } from './routers/rootRouter.js'
import { handleError } from '#middlewares/handleError.js'
import { render404 } from '#middlewares/render404.js'
import { setUser } from '#middlewares/setUser.js'
import { getSessionStore } from './db/index.js'
import { CONFIG } from './config/config.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(
  session({
    store: getSessionStore(session),
    secret: CONFIG.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
)
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(passport.session())
app.use(setUser)

app.use('/', rootRouter)
app.use(render404)
app.use(handleError)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
