import { Router } from 'express'

import MessagesController from '#controllers/MessagesController.js'
import UserValidator from '#validators/UserValidator.js'
import MessageValidator from '#validators/MessageValidator.js'

export const messagesRouter = Router()

messagesRouter.post(
  '/new-message',
  UserValidator.onlyAuth,
  MessageValidator.validateCreateMessage,
  MessagesController.create,
)
messagesRouter.post(
  '/delete-message/:id',
  UserValidator.onlyAdmin,
  MessagesController.deleteMsg,
)
