const router = require('express').Router();
// const Product = require('../db/Product')
const { Product } = require('../db/');

router.get('/', async (req, res, next) => {
  try {
    console.log('time to get the products');
    const allProducts = await Product.findAll();
    console.log('this is products from router', allProducts);
    res.json(allProducts);
  } catch (err) {
    res.sendStatus(404)
  }
})

module.exports = router
