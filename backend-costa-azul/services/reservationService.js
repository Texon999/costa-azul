import * as reservationRepository from '../repositories/reservationRepository.js'
import * as roomRepository from '../repositories/roomRepository.js'
import { validate } from '../utils/validate.js'
import { createReservationSchema } from '../validators/reservationValidator.js'
import { calculateNights } from '../utils/calculateNights.js'

export const getAllReservations = async () => {
  return await reservationRepository.findAllReservations()
}

export const createReservation = async (data) => {
  const { id_usuario, id_sede, fecha_inicio, fecha_fin } = data

  validate(createReservationSchema, { id_sede, fecha_inicio, fecha_fin })

  const room = await roomRepository.findRoomsAvailable(id_sede, fecha_inicio, fecha_fin)
  if (!room) {
    throw { status: 400, message: 'No hay habitaciones disponibles para las fechas seleccionadas' }
  }

  const nights = calculateNights(fecha_inicio, fecha_fin)
  const totalPrice = nights * room.precio_noche

  return await reservationRepository.createReservation({
    id_usuario,
    id_sede,
    id_habitacion: room.id_habitacion,
    fecha_inicio,
    fecha_fin,
    precio: totalPrice,
  })
}

export const getReservationsByUsuario = async (id_usuario) => {
  return await reservationRepository.findByUsuario(id_usuario)
}

export const getReservationsByDate = async (fecha_inicio, fecha_fin, id_usuario) => {
  if (!fecha_inicio || !fecha_fin) {
    throw { status: 400, message: 'Las fechas de inicio y fin son obligatorias' }
  }
  return await reservationRepository.findReservationBydate(fecha_inicio, fecha_fin, id_usuario)
}

export const getReservationsByStatus = async (status, id_usuario) => {
  if (!status) {
    throw { status: 400, message: 'El estado es obligatorio' }
  }
  return await reservationRepository.findReservationBystatus(status, id_usuario)
}

export const updateReservation = async (id, data) => {
  const reservation = await reservationRepository.findReservationById(id)
  if (!reservation) {
    throw { status: 404, message: 'Reserva no encontrada' }
  }
  return await reservationRepository.updateReservation(id, data)
}

const VALID_STATUSES = ['pendiente', 'confirmada', 'cancelada', 'completada']

export const updateReservationStatus = async (id, status) => {
  if (!status || !VALID_STATUSES.includes(status.toLowerCase())) {
    throw { status: 400, message: `Estado inválido. Valores permitidos: ${VALID_STATUSES.join(', ')}` }
  }
  const reservation = await reservationRepository.findReservationById(id)
  if (!reservation) {
    throw { status: 404, message: 'Reserva no encontrada' }
  }
  return await reservationRepository.updateReservationStatus(id, status.toLowerCase())
}

export const updatePriceReservation = async (id, precio) => {
  const reservation = await reservationRepository.findReservationById(id)
  if (!reservation) {
    throw { status: 404, message: 'Reserva no encontrada' }
  }
  return await reservationRepository.updatePriceReservation(id, precio)
}

export const deleteReservationCancelled = async (id_usuario) => {
  const deleted = await reservationRepository.deleteReservationCancelled(id_usuario)
  return { eliminadas: deleted }
}
