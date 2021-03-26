// Puerto
process.env.PORT = process.env.PORT || 3000

// Entorno produccion | dev = desarrollo
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// Seed de autenticacion
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'

// Coneccion a Base de datos
let urlDB
if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://churrasco.uk.to:27017/challenge'
} else {
  urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB
