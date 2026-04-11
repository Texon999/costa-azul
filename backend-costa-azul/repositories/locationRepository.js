import { pool } from '../config/db.js'

export const getlocations = async () => {
  const [rows] = await pool.execute('SELECT * FROM sede')
  return rows
}
