import { pool } from '../config/db.js'

export const findAllReservations = async () => {
  const [rows] = await pool.execute(
    `SELECT r.id_reserva, r.fecha_inicio, r.fecha_fin, r.precio, r.estado,
            s.nombre, s.ciudad, s.imagen_url,
            h.numero, h.tipo
     FROM reserva r
     JOIN sede s ON r.id_sede = s.id_sede
     JOIN habitacion h ON r.id_habitacion = h.id_habitacion
     ORDER BY r.created_at DESC`
  )
  return rows
}

export const findReservationById = async (id) => {
  const [rows] = await pool.execute(
    'SELECT * FROM reserva WHERE id_reserva = ?',
    [id]
  )
  return rows[0]
}

export const findByUsuario = async (id_usuario) => {
  const [rows] = await pool.execute(
    `SELECT r.id_reserva, r.fecha_inicio, r.fecha_fin, r.precio, r.estado,
            s.nombre, s.ciudad
     FROM reserva r
     JOIN sede s ON r.id_sede = s.id_sede
     WHERE r.id_usuario = ?
     ORDER BY r.id_reserva DESC`,
    [id_usuario]
  )
  return rows
}

export const createReservation = async (data) => {
  const { id_usuario, id_sede, id_habitacion, fecha_inicio, fecha_fin, precio } = data

  const [result] = await pool.execute(
    'INSERT INTO reserva (id_usuario, id_sede, id_habitacion, fecha_inicio, fecha_fin, precio) VALUES (?, ?, ?, ?, ?, ?)',
    [id_usuario, id_sede, id_habitacion, fecha_inicio, fecha_fin, precio]
  )

  return await findReservationById(result.insertId)
}

export const findReservationBydate = async (fecha_inicio, fecha_fin, id_usuario) => {
  const [rows] = await pool.execute(
    'SELECT * FROM reserva WHERE fecha_inicio >= ? AND fecha_fin <= ? AND id_usuario = ?',
    [fecha_inicio, fecha_fin, id_usuario]
  )
  return rows
}

export const findReservationBystatus = async (status, id_usuario) => {
  const [rows] = await pool.execute(
    'SELECT * FROM reserva WHERE estado = ? AND id_usuario = ?',
    [status, id_usuario]
  )
  return rows
}

export const updateReservation = async (id, data) => {
  const { id_sede, fecha_inicio, fecha_fin, estado } = data
  await pool.execute(
    'UPDATE reserva SET id_sede = ?, fecha_inicio = ?, fecha_fin = ?, estado = ? WHERE id_reserva = ?',
    [id_sede, fecha_inicio, fecha_fin, estado, id]
  )
  return await findReservationById(id)
}

export const updateReservationStatus = async (id, status) => {
  await pool.execute(
    'UPDATE reserva SET estado = ? WHERE id_reserva = ?',
    [status, id]
  )
  return await findReservationById(id)
}

export const updatePriceReservation = async (id, precio) => {
  await pool.execute(
    'UPDATE reserva SET precio = ? WHERE id_reserva = ?',
    [precio, id]
  )
  return await findReservationById(id)
}

export const deleteReservationCancelled = async (id_usuario) => {
  const [result] = await pool.execute(
    "DELETE FROM reserva WHERE estado = 'cancelada' AND id_usuario = ?",
    [id_usuario]
  )
  return result.affectedRows
}
