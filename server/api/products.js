const router = require('express').Router();
// const Product = require('../db/Product')
const { Product } = require('../db/');

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.json(allProducts);
  } catch (err) {
    res.sendStatus(404)
  }
})

module.exports = router
