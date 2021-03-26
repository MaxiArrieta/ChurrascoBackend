const jwt = require('jsonwebtoken')

// Verioficamos el Token
const verificarToken = (req, res, next) => {
  const token = req.get('token')

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: 'Token no válido'
        }
      })
    }

    req.usuario = decoded.usuario
    next()
  })
}

module.exports = verificarToken
