import passport from 'passport'
import { validationResult, matchedData } from 'express-validator'
import UsersModel from '../models/usersModel.js'

function renderHome(req, res) {
  res.render('home')
}

function renderSignUp(req, res) {
  res.render('sign-up')
}

function renderLogin(req, res) {
  res.render('login')
}

function renderJoinVip(req, res) {
  if (req.user.vip) {
    return res.redirect('/')
  }

  res.render('join-vip')
}

async function joinVip(req, res) {
  const { secret } = req.body

  if (secret !== 'odinites') {
    return res.render('join-vip', { error: 'The secret is wrong' })
  }

  await UsersModel.joinVip(req.user.id)
  req.user.vip = true
  res.redirect('/')
}

async function signUp(req, res, next) {
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

  const userData = matchedData(req)
  const userExists = await UsersModel.userExists(userData.username)

  if (userExists) {
    return res.render('sign-up', {
      logicError: 'Username already exists',
      formData: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
      },
    })
  }

  const idInserted = await UsersModel.create({
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    password: userData.password,
  })

  req.login({ id: idInserted }, (err) => {
    if (err) {
      return next(err)
    }

    res.redirect('/')
  })
}

function login(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
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

      res.redirect('/')
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
  renderJoinVip,
  signUp,
  login,
  logout,
  joinVip,
}
