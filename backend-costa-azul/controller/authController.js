import * as authService from '../services/authService.js'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 1000 * 60 * 60 * 24, // 24 horas
}

//data es el return de services
export const register = async (req, res) => {
  try {
    const { user, password } = req.body
    const data = await authService.register(user, password)

    res.status(201).json({ ok: true, data })
  } catch (error) {
    res.status(error.status ?? 500).json({ ok: false, message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { user, password } = req.body
    const data = await authService.login(user, password)

    res.cookie('token', data.token, COOKIE_OPTIONS)
    res.status(200).json({ ok: true, data: data.user })
  } catch (error) {
    res.status(error.status ?? 500).json({ ok: false, message: error.message })
  }
}

export const logout = (req, res) => {
  res.clearCookie('token', COOKIE_OPTIONS)
  res.status(200).json({ ok: true, message: 'Sesión cerrada correctamente' })
}

export const me = (req, res) => {
  const token = req.cookies?.token
  if (!token) {
    return res.status(401).json({ ok: false, message: 'No autorizado' })
  }

  try {
    const decoded = authService.verifyToken(token)
    res.status(200).json({ ok: true, data: decoded })
  } catch (error) {
    res.status(401).json({ ok: false, message: 'Token inválido o expirado' })
  }
}

















