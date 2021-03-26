const express = require('express')
const Hash = require('js-sha256')
const jwt = require('jsonwebtoken')

const Users = require('../models/user')

const app = express()

// Login de usuario
app.post('/', (req, res) => {
  const body = req.body

  console.log({ body })
  // ternaria para hacer el login por username o email
  const consulta = body.email
    ? { email: body.email }
    : { username: body.username }

  Users.findOne(consulta, (err, usuarioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
    try {
      if (!usuarioDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'Usuario o contraseña incorrecta'
          }
        })
      }
      // Hago un hash al password para que esten iguales
      const password = Hash.hex(body.password)

      if (password !== usuarioDB.password) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'Usuario o contraseña incorrecta'
          }
        })
      }

      if (usuarioDB.active && usuarioDB.role === 'admin') {
        const token = jwt.sign({
          user: usuarioDB
        },
        process.env.SEED, { expiresIn: 18000 }
        )

        return res.status(200).json({
          ok: true,
          usuario: usuarioDB,
          token
        })
      } else {
        return res.json({
          ok: false,
          error: usuarioDB.active
            ? 'El usuario no tiene los permisos para iniciar sesion'
            : 'El usuario no esta activo'
        })
      }
    } catch (error) {
      return res.status(500).json({
        ok: false,
        error: 'Ups hubo un error'
      })
    }
  })
})

module.exports = app
