import bcrypt from 'bcryptjs'

import UsersModel from '../models/usersModel.js'
import { validationResult, matchedData } from 'express-validator'

const renderHome = (req, res) => {
  res.send('Hello World!')
}

const renderSignUp = (req, res) => {
  res.render('signup')
}

const signup = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const userData = matchedData(req)
  const userExists = await UsersModel.userExists(userData.username)

  if (userExists) {
    return res.status(400).json({ error: 'Username already exists' })
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

  console.log({ userId })

  res.redirect('/')
}

export default {
  renderHome,
  renderSignUp,
  signup,
}
