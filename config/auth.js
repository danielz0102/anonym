import passport from 'passport'
import { Strategy } from 'passport-local'
import bcrypt from 'bcryptjs'

import UsersModel from '../models/usersModel.js'

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await UsersModel.getUser(username)

      if (!user) {
        return done(null, false, { message: 'User not found' })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return done(null, false, { message: 'Invalid password' })
      }

      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }),
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UsersModel.getUser(Number(id))
    done(null, {
      id: user.id,
      username: user.username,
      vip: user.vip,
    })
  } catch (error) {
    done(error)
  }
})

export default passport
