import { Router } from 'express'

import UsersController from '#controllers/UsersController.js'
import UserValidator from '#validators/UserValidator.js'

export const usersRouter = Router()

usersRouter.get('/logout', UsersController.logout)
usersRouter.post('/login', UsersController.login)
usersRouter.post(
  '/sign-up',
  UserValidator.validateSignUp,
  UsersController.signUp,
)
usersRouter.post('/join-vip', UserValidator.onlyAuth, UsersController.joinVip)
usersRouter.post(
  '/join-admin',
  UserValidator.onlyAuth,
  UsersController.joinAdmin,
)
