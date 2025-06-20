import { Router } from 'express'
import RootController from '../controllers/rootController.js'
import { validateUser } from '#validations/validateUser.js'
import auth from '../config/auth.js'

export const rootRouter = Router()

rootRouter.get('/', RootController.renderHome)
rootRouter.get('/sign-up', RootController.renderSignUp)
rootRouter.post('/sign-up', validateUser(), RootController.signup)
rootRouter.get('/login', RootController.renderLogin)
rootRouter.post(
  '/login',
  auth.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
)
