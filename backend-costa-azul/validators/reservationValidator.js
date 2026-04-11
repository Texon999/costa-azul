import {  z  } from 'zod';



export const createReservationSchema = z.object({
  id_sede: z.number().positive('La sede debe ser válida'),

  fecha_inicio: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido, usa YYYY-MM-DD')
    .refine((fecha) => {
      const hoy = new Date()
      hoy.setHours(0, 0, 0, 0)
      return new Date(fecha) >= hoy
    }, 'La fecha no puede ser en el pasado'),

  fecha_fin: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido, usa YYYY-MM-DD')

}).refine((data) => {
  return new Date(data.fecha_fin) > new Date(data.fecha_inicio)
}, {
  message: 'La fecha fin debe ser posterior a la fecha inicio',
  path: ['fecha_fin']
})