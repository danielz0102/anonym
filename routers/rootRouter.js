import { Router } from 'express'
import RootController from '../controllers/rootController.js'
import { validateUser } from '#validations/validateUser.js'

export const rootRouter = Router()

rootRouter.get('/', RootController.renderHome)
rootRouter.get('/sign-up', RootController.renderSignUp)
rootRouter.post('/sign-up', validateUser(['body']), RootController.signup)
