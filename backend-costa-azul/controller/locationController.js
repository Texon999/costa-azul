import * as locationService from '../services/locationService.js'

export const getLocations = async (req, res) => {
  try {
    const locations = await locationService.getLocations()
    res.status(200).json({ ok: true, data: locations })
  } catch (error) {
    console.error('Error al obtener las sedes:', error)
    res.status(error.status ?? 500).json({ ok: false, message: error.message || 'Error al obtener las sedes' })
  }
}
