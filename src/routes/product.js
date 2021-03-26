const express = require('express')

const Products = require('../models/product')
const verificarToken = require('../middlewares/authenticacion')

const app = express()

app.get('/', verificarToken, (_req, res) => {
  Products.find({})
    .exec((err, productsDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        })
      }

      return res.status(200).json({
        ok: true,
        products: productsDB
      })
    })
})

app.post('/product', verificarToken, (req, res) => {
  const body = req.body

  const product = new Products({
    SKU: body.SKU,
    name: body.name,
    pictures: body.pictures,
    price: body.price,
    currency: body.currency,
    code: body.code ? body.code : null,
    description: body.description ? body.description : ''
  })

  product.save((err, productDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }
    return res.status(200).json({
      ok: true,
      product: productDB
    })
  })
})

module.exports = app
