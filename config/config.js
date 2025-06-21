import 'dotenv/config'

export const {
  DB_URL,
  SESSION_SECRET,
  NODE_ENV = 'development',
  SALT = 10,
  ADMIN_SECRET,
} = process.env
