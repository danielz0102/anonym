import { db } from '../db/index.js'

const create = async ({ firstName, lastName, username, password }) => {
  const { rows } = await db.query(
    'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING id',
    [firstName, lastName, username, password],
  )
  const user = rows[0]
  return Number(user.id)
}

const userExists = async (username) => {
  const { rows } = await db.query('SELECT id FROM users WHERE username = $1', [
    username,
  ])

  return rows.length > 0
}

const getUser = async (identifier) => {
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
  }
}

export default {
  create,
  userExists,
  getUser,
}
