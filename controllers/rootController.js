import bcrypt from 'bcryptjs'
import { validationResult, matchedData } from 'express-validator'
import UsersModel from '../models/usersModel.js'

function renderHome(req, res) {
  res.render('home')
}

function renderSignUp(req, res) {
  res.render('signup')
}

function renderLogin(req, res) {
  res.render('login')
}

async function signup(req, res) {
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

  console.log({ userRegistered: userId })

  res.redirect('/')
}

export default {
  renderHome,
  renderSignUp,
  renderLogin,
  signup,
}
