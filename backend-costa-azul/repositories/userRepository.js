import { pool } from '../config/db.js'

export const userfind = async (user) => {
  const [rows] = await pool.execute(
    "SELECT * FROM usuario WHERE nombre_usuario = ?",
    [user]
  )
  return rows[0]
}

export const findById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT id_usuario, nombre_usuario, created_at FROM usuario WHERE id_usuario = ?",
    [id]
  )
  return rows[0]
}

export const createUser = async (user, hashedPassword) => {
  const [result] = await pool.execute(
    "INSERT INTO usuario (nombre_usuario, contrasena_usuario) VALUES (?, ?)",
    [user, hashedPassword]
  )
  return {
    id: result.insertId,
    user
  }
}