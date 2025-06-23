import passport from 'passport'
import UsersModel from '#models/UsersModel.js'
import { ADMIN_SECRET } from '../config/config.js'

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

async function signUp(req, res, next) {
  const { firstName, lastName, username, password } = req.body
  const userInserted = await UsersModel.create({
    firstName,
    lastName,
    username,
    password,
  })

  if (!userInserted) {
    return res.render('sign-up', {
      logicError: 'Username already exists',
      formData: { firstName, lastName, username },
    })
  }

  req.login(userInserted, (err) => {
    if (err) {
      return next(err)
    }

    res.redirect('/')
  })
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

async function joinAdmin(req, res) {
  const { secret } = req.body

  if (secret !== ADMIN_SECRET) {
    return res.render('join-admin', { error: 'The secret is wrong' })
  }

  await UsersModel.joinAdmin(req.user.id)
  req.user.vip = true
  req.user.admin = true
  res.redirect('/')
}

export default {
  signUp,
  login,
  logout,
  joinVip,
  joinAdmin,
}
