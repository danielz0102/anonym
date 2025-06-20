import bcrypt from 'bcryptjs'
import { validationResult, matchedData } from 'express-validator'
import UsersModel from '../models/usersModel.js'
import auth from '../config/auth.js'

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

function login(req, res, next) {
  auth.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }

    if (!user) {
      return res.render('login', { loginError: info.message })
    }

    req.login(user, (err) => {
      if (err) {
        return next(err)
      }

      return res.redirect('/')
    })
  })(req, res, next)
}

function logout(req, res) {
  req.logout((err) => {
    if (err) {
      throw new Error(err)
    }
    res.redirect('/login')
  })
}

export default {
  renderHome,
  renderSignUp,
  renderLogin,
  signup,
  login,
  logout,
}
