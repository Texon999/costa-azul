
import 'dotenv/config'
import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

export const connectDB = async () => {
  try {
    const connection = await pool.getConnection()
    console.log('Base de datos conectada correctamente')
    connection.release() // bug fix: faltaban los paréntesis, nunca liberaba la conexión
  } catch (error) {
    console.error('Error conectando la base de datos:', error.message)
    process.exit(1) // si no hay DB, no tiene sentido seguir
  }
}