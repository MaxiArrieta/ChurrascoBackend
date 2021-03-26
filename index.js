const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('./src/config/index')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

// Configuracion global de rutas
app.use(require('./src/routes/index'))

mongoose.connect(
  process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    auth: {
      user: 'challenge',
      password: 'challenge'
    },
    authSource: 'admin'
  },

  (err, res) => {
    if (err) throw err

    console.log('Conectado a Base de Datos')
  }
)

app.listen(process.env.PORT, () => {
  console.log(`server en puerto ${process.env.PORT}`)
})
