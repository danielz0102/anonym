import { db } from '../db/index.js'
import { BusinessError } from '#customErrors/BusinessError.js'

async function create({ userId, title, content }) {
  const { rows: existingUserRows } = await db.query(
    'SELECT id FROM users WHERE id = $1',
    [userId],
  )

  if (existingUserRows.length === 0) {
    throw new BusinessError(`User with ID ${userId} does not exist`)
  }

  const { rows } = await db.query(
    'INSERT INTO messages (user_id, title, content) VALUES ($1, $2, $3) RETURNING id',
    [userId, title, content],
  )
  return Number(rows[0].id)
}

export default {
  create,
}
