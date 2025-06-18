import { Pool } from 'pg'
import { CONFIG } from '../config.js'

export const db = new Pool({ connectionString: CONFIG.DB_URL })
