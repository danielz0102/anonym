import { Router } from 'express'
import RootController from '../controllers/rootController.js'
import { validateUser } from '#validations/validateUser.js'
import { validateMessage } from '#validations/validateMessage.js'
import { checkAuth } from '#middlewares/checkAuth.js'

export const rootRouter = Router()

rootRouter.get('/', RootController.renderHome)
rootRouter.get('/login', RootController.renderLogin)
rootRouter.get('/sign-up', RootController.renderSignUp)
rootRouter.get('/join-vip', checkAuth, RootController.renderJoinVip)
rootRouter.get('/new-message', checkAuth, RootController.renderNewMessage)

rootRouter.get('/logout', RootController.logout)
rootRouter.post('/login', RootController.login)
rootRouter.post('/sign-up', validateUser(), RootController.signUp)
rootRouter.post('/join-vip', checkAuth, RootController.joinVip)
rootRouter.post(
  '/new-message',
  checkAuth,
  validateMessage(),
  RootController.createMessage,
)
