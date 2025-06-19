import { db } from '../db/index.js'

const create = async ({ firstName, lastName, username, password }) => {
  const { rows } = await db.query(
    'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING id',
    [firstName, lastName, username, password],
  )
  const user = rows[0]
  return Number(user.id) || null
}

const userExists = async (username) => {
  const { rows } = await db.query('SELECT id FROM users WHERE username = $1', [
    username,
  ])

  return rows.length > 0
}

export default {
  create,
  userExists,
}
