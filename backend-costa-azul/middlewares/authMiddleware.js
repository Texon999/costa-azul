import jwt from 'jsonwebtoken'



export const protect = (req, res, next) => {
  try {
    const token = req.cookies?.token

    if (!token) {
      return res.status(401).json({ ok: false, message: 'No autorizado' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ ok: false, message: 'Sesión expirada' })
    }
    return res.status(401).json({ ok: false, message: 'No autorizado' })
  }
} 