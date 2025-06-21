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

async function getAll() {
  const { rows } = await db.query(
    `SELECT u.username, m.title, m.content, m.created_at
     FROM messages m
     JOIN users u ON m.user_id = u.id
     ORDER BY m.created_at DESC`,
  )

  return rows.map((row) => ({
    author: row.username,
    title: row.title,
    content: row.content,
    date: new Date(row.created_at).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }),
  }))
}

export default {
  create,
  getAll,
}
