import passport from 'passport'
import UsersModel from '#models/UsersModel.js'
import { BusinessError } from '#customErrors/BusinessError.js'

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
  let userInserted = null

  try {
    userInserted = await UsersModel.create({
      firstName,
      lastName,
      username,
      password,
    })
  } catch (err) {
    if (err instanceof BusinessError) {
      return res.render('sign-up', {
        logicError: err.message,
        formData: { firstName, lastName, username },
      })
    }

    next(err)
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

export default {
  signUp,
  login,
  logout,
  joinVip,
}
