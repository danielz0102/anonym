import { db } from '../db/index.js'

async function create({ userId, title, content }) {
  const { rows } = await db.query(
    'INSERT INTO messages (user_id, title, content) VALUES ($1, $2, $3) RETURNING id',
    [userId, title, content],
  )
  return Number(rows[0].id)
}

export default {
  create,
}
