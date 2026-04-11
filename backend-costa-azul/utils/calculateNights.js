export const calculateNights = (fecha_inicio, fecha_fin) => {
  const start = new Date(fecha_inicio)
  const end = new Date(fecha_fin)
  const diffTime = end - start
  return diffTime / (1000 * 60 * 60 * 24)
}