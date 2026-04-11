import { z } from 'zod'

export const registerSchema = z.object({
  user: z
    .string({
      required_error: 'El nombre de usuario es necesario',
      invalid_type_error: 'El nombre de usuario debe ser texto',
    })
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'Solo letras, números y guiones bajos'),

  password: z
    .string({
      required_error: 'La contraseña es necesaria',
      invalid_type_error: 'La contraseña debe ser texto',
    })
    .min(4, 'La contraseña debe tener al menos 4 caracteres')
    .max(10, 'La contraseña no puede tener más de 10 caracteres'),
})

// Login solo valida que existan los campos, sin restricciones de formato
export const loginSchema = z.object({
  user: z.string({ required_error: 'El usuario es necesario' }).min(1),
  password: z.string({ required_error: 'La contraseña es necesaria' }).min(1),
})
