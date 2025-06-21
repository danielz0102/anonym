import { Router } from 'express'

import RootController from '#controllers/RootController.js'
import UserValidator from '#validators/UserValidator.js'

export const rootRouter = Router()

rootRouter.get('/', RootController.renderHome)
rootRouter.get('/login', RootController.renderLogin)
rootRouter.get('/sign-up', RootController.renderSignUp)
rootRouter.get(
  '/join-vip',
  UserValidator.onlyAuth,
  RootController.renderJoinVip,
)
rootRouter.get(
  '/new-message',
  UserValidator.onlyAuth,
  RootController.renderNewMessage,
)
rootRouter.get(
  '/join-admin',
  UserValidator.onlyAuth,
  RootController.renderJoinAdmin,
)
