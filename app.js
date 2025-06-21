import express from 'express'
import session from 'express-session'
import passport from 'passport'
import './config/auth.js'

import { getSessionStore } from './db/index.js'
import { SESSION_SECRET, NODE_ENV } from './config/config.js'

import { rootRouter } from './routers/rootRouter.js'
import { usersRouter } from './routers/usersRouter.js'
import { messagesRouter } from './routers/messagesRouter.js'

import { handleError } from '#middlewares/handleError.js'
import { render404 } from '#middlewares/render404.js'
import { setUser } from '#middlewares/setUser.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(
  session({
    store: getSessionStore(session),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: NODE_ENV === 'production',
      httpOnly: true,
    },
  }),
)
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(passport.session())
app.use(setUser)

app.use('/', rootRouter)
app.use('/', usersRouter)
app.use('/', messagesRouter)
app.use(render404)
app.use(handleError)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
