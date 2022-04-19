const router = require('express').Router();
const Product = require('../db/Product')

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    console.log('this is products from router', allProducts);
    res.send(allProducts);
  } catch (err) {
    res.sendStatus(404)
  }
})

module.exports = router
