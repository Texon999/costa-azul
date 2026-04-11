import * as reservationService from '../services/reservationService.js'

export const getAllReservations = async (req, res) => {
  try {
    const data = await reservationService.getAllReservations()
    res.status(200).json({ ok: true, data })
  } catch (error) {
    res.status(error.status ?? 500).json({ ok: false, message: error.message })
  }
}

export const createReservation = async (req, res) => {
  try {
    const data = await reservationService.createReservation({
      ...req.body,
      id_usuario: req.user.id,
    })
    res.status(201).json({ ok: true, data })
  } catch (error) {
    res.status(error.status ?? 500).json({ ok: false, message: error.message })
  }
}

export const getReservations = async (req, res) => {
  try {
    const data = await reservationService.getReservationsByUsuario(req.user.id)
    res.status(200).json({ ok: true, data })
  } catch (error) {
    res.status(error.status ?? 500).json({ ok: false, message: error.message })
  }
}

export const getReservationsByDate = async (req, res) => {
  try {
    const { fecha_inicio, fecha_fin } = req.query
    const data = await reservationService.getReservationsByDate(fecha_inicio, fecha_fin, req.user.id)
    res.status(200).json({ ok: true, data })
  } catch (error) {
    res.status(error.status ?? 500).json({ ok: false, message: error.message })
  }
}

export const getReservationsByStatus = async (req, res) => {
  try {
    const { status } = req.query
    const data = await reservationService.getReservationsByStatus(status, req.user.id)
    res.status(200).json({ ok: true, data })
  } catch (error) {
    res.status(error.status ?? 500).json({ ok: false, message: error.message })
  }
}

export const updateReservation = async (req, res) => {
  try {
    const { id } = req.params
    const data = await reservationService.updateReservation(id, req.body)
    res.status(200).json({ ok: true, data })
  } catch (error) {
    res.status(error.status ?? 500).json({ ok: false, message: error.message })
  }
}

export const updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { estado } = req.body
    const data = await reservationService.updateReservationStatus(id, estado)
    res.status(200).json({ ok: true, data })
  } catch (error) {
    res.status(error.status ?? 500).json({ ok: false, message: error.message })
  }
}

export const updatePriceReservation = async (req, res) => {
  try {
    const { id } = req.params
    const { precio } = req.body
    const data = await reservationService.updatePriceReservation(id, precio)
    res.status(200).json({ ok: true, data })
  } catch (error) {
    res.status(error.status ?? 500).json({ ok: false, message: error.message })
  }
}

export const deleteReservationCancelled = async (req, res) => {
  try {
    const data = await reservationService.deleteReservationCancelled(req.user.id)
    res.status(200).json({ ok: true, ...data })
  } catch (error) {
    res.status(error.status ?? 500).json({ ok: false, message: error.message })
  }
}
