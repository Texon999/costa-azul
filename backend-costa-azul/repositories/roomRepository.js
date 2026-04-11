import { pool } from '../config/db.js'

export const findRoomsAvailable = async (id_sede, fecha_inicio, fecha_fin) => {
  const [rows] = await pool.execute(
    `SELECT habitacion.*
     FROM habitacion
     WHERE habitacion.id_sede = ?
       AND habitacion.id_habitacion NOT IN (
         SELECT reserva.id_habitacion
         FROM reserva
         WHERE reserva.estado != 'cancelada'
           AND reserva.fecha_inicio < ?
           AND reserva.fecha_fin > ?
       )
     LIMIT 1`,
    [id_sede, fecha_fin, fecha_inicio]
  )
  return rows[0] ?? null
}
