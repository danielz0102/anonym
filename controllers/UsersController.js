import passport from 'passport'
import UsersModel from '#models/UsersModel.js'

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
  const user = req.body
  const userExists = await UsersModel.userExists(user.username)

  if (userExists) {
    return res.render('sign-up', {
      logicError: 'Username already exists',
      formData: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      },
    })
  }

  const idInserted = await UsersModel.create({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    password: user.password,
  })

  req.login({ id: idInserted }, (err) => {
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
