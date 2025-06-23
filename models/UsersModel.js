import bcrypt from 'bcryptjs'

import { db } from '../db/index.js'
import { SALT } from '../config/config.js'

async function create({ firstName, lastName, username, password }) {
  const { rows: existingUserRows } = await db.query(
    'SELECT * FROM users WHERE username = $1',
    [username],
  )

  if (existingUserRows.length > 0) {
    return false
  }

  const hashedPassword = await bcrypt.hash(password, SALT)
  const { rows } = await db.query(
    'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING id',
    [firstName, lastName, username, hashedPassword],
  )
  const user = rows[0]

  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    username: username,
  }
}

async function getUser(identifier) {
  const field = typeof identifier === 'number' ? 'id' : 'username'
  const query = `SELECT * FROM users WHERE ${field} = $1`
  const { rows } = await db.query(query, [identifier])
  const user = rows[0]

  if (!user) {
    return null
  }

  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    username: user.username,
    password: user.password,
    vip: user.vip,
    admin: user.admin,
  }
}

async function joinVip(id) {
  await db.query('UPDATE users SET vip = TRUE WHERE id = $1', [id])
}

async function joinAdmin(id) {
  await db.query('UPDATE users SET admin = TRUE, vip = TRUE WHERE id = $1', [
    id,
  ])
}

export default {
  create,
  getUser,
  joinVip,
  joinAdmin,
}
