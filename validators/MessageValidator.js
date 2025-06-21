import { validationResult, matchedData } from 'express-validator'
import { validateMessage } from '#validations/validateMessage.js'

export const validateCreateMessage = [
  validateMessage(),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.render('new-message', {
        errors: errors.array().map((error) => error.msg),
        formData: {
          title: req.body.title,
          content: req.body.content,
        },
      })
    }

    const { title, content } = matchedData(req)

    req.body = {
      title,
      content,
    }
    next()
  },
]

export default {
  validateCreateMessage,
}
