import { Router } from 'express'
import RootController from '#controllers/rootController.js'
import RenderController from '#controllers/RenderController.js'
import { validateUser } from '#validations/validateUser.js'
import { validateMessage } from '#validations/validateMessage.js'
import { checkAuth } from '#middlewares/checkAuth.js'

export const rootRouter = Router()

rootRouter.get('/', RenderController.renderHome)
rootRouter.get('/login', RenderController.renderLogin)
rootRouter.get('/sign-up', RenderController.renderSignUp)
rootRouter.get('/join-vip', checkAuth, RenderController.renderJoinVip)
rootRouter.get('/new-message', checkAuth, RenderController.renderNewMessage)

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
