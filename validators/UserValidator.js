import { validationResult, matchedData } from 'express-validator'
import { validateUser } from '#validations/validateUser.js'

export const validateSignUp = [
  validateUser(),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.render('sign-up', {
        validationErrors: errors.array().map((error) => error.msg),
        formData: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
        },
      })
    }

    const { firstName, lastName, username, password } = matchedData(req)

    req.body = {
      firstName,
      lastName,
      username,
      password,
    }
    next()
  },
]

export function onlyAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/')
}

export default {
  validateSignUp,
  onlyAuth,
}
