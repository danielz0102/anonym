import bcrypt from 'bcryptjs'
import { validationResult, matchedData } from 'express-validator'
import UsersModel from '../models/usersModel.js'

const renderHome = (req, res) => {
  res.render('home')
}

const renderSignUp = (req, res) => {
  res.render('signup')
}

const signup = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.render('signup', {
      validationErrors: errors.array().map((error) => error.msg),
      formData: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
      },
    })
  }

  const userData = matchedData(req)
  const userExists = await UsersModel.userExists(userData.username)

  if (userExists) {
    return res.render('signup', {
      logicError: 'Username already exists',
      formData: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
      },
    })
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10)
  const user = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    password: hashedPassword,
  }
  const userId = await UsersModel.create(user)

  if (!userId) {
    return res.status(500).json({ error: 'Failed to create user' })
  }

  console.log({ userRegistered: userId })

  res.redirect('/')
}

export default {
  renderHome,
  renderSignUp,
  signup,
}
