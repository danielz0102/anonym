import { Pool } from 'pg'
import { DB_URL } from '../config/config.js'
import connectPgSimple from 'connect-pg-simple'

export const db = new Pool({ connectionString: DB_URL })

export function getSessionStore(expressSession) {
  const PgSession = connectPgSimple(expressSession)
  return new PgSession({
    pool: db,
    tableName: 'session',
  })
}
