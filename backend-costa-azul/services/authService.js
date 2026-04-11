import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import * as userRepository from '../repositories/userRepository.js'
import { loginSchema, registerSchema } from '../validators/authValidator.js'
import { validate } from '../utils/validate.js'

export const register = async (user, password) => {
  validate(registerSchema, { user, password })

  const existing = await userRepository.userfind(user)
  if (existing) {
    throw { status: 409, message: 'Este usuario ya está registrado' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  return await userRepository.createUser(user, hashedPassword)
}

export const login = async (user, password) => {
  validate(loginSchema, { user, password })

  const found = await userRepository.userfind(user)
  if (!found) {
    throw { status: 401, message: 'Usuario o contraseña incorrectos' }
  }

  const match = await bcrypt.compare(password, found.contrasena_usuario)
  if (!match) {
    throw { status: 401, message: 'Usuario o contraseña incorrectos' }
  }

  const token = jwt.sign(
    { id: found.id_usuario, user: found.nombre_usuario },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )

  return {
    token,
    user: { id: found.id_usuario, user: found.nombre_usuario },
  }
}

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
