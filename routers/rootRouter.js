import { Router } from 'express'

import UsersController from '#controllers/UsersController.js'
import MessagesController from '#controllers/MessagesController.js'
import RenderController from '#controllers/RenderController.js'

import UserValidator from '#validators/UserValidator.js'
import MessageValidator from '#validators/MessageValidator.js'

export const rootRouter = Router()

rootRouter.get('/', RenderController.renderHome)
rootRouter.get('/login', RenderController.renderLogin)
rootRouter.get('/sign-up', RenderController.renderSignUp)
rootRouter.get(
  '/join-vip',
  UserValidator.onlyAuth,
  RenderController.renderJoinVip,
)
rootRouter.get(
  '/new-message',
  UserValidator.onlyAuth,
  RenderController.renderNewMessage,
)
rootRouter.get(
  '/join-admin',
  UserValidator.onlyAuth,
  RenderController.renderJoinAdmin,
)

rootRouter.get('/logout', UsersController.logout)
rootRouter.post('/login', UsersController.login)
rootRouter.post(
  '/sign-up',
  UserValidator.validateSignUp,
  UsersController.signUp,
)
rootRouter.post('/join-vip', UserValidator.onlyAuth, UsersController.joinVip)
rootRouter.post(
  '/join-admin',
  UserValidator.onlyAuth,
  UsersController.joinAdmin,
)

rootRouter.post(
  '/new-message',
  UserValidator.onlyAuth,
  MessageValidator.validateCreateMessage,
  MessagesController.create,
)
rootRouter.post(
  '/delete-message/:id',
  UserValidator.onlyAdmin,
  MessagesController.deleteMsg,
)
