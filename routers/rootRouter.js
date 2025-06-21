import { Router } from 'express'

import UsersController from '#controllers/UsersController.js'
import MessagesController from '#controllers/MessagesController.js'
import RenderController from '#controllers/RenderController.js'

import UserValidator from '#validators/UserValidator.js'
import { validateMessage } from '#validations/validateMessage.js'

import { checkAuth } from '#middlewares/checkAuth.js'

export const rootRouter = Router()

rootRouter.get('/', RenderController.renderHome)
rootRouter.get('/login', RenderController.renderLogin)
rootRouter.get('/sign-up', RenderController.renderSignUp)
rootRouter.get('/join-vip', checkAuth, RenderController.renderJoinVip)
rootRouter.get('/new-message', checkAuth, RenderController.renderNewMessage)

rootRouter.get('/logout', UsersController.logout)
rootRouter.post('/login', UsersController.login)
rootRouter.post(
  '/sign-up',
  UserValidator.validateSignUp,
  UsersController.signUp,
)
rootRouter.post('/join-vip', checkAuth, UsersController.joinVip)
rootRouter.post(
  '/new-message',
  checkAuth,
  validateMessage(),
  MessagesController.create,
)
