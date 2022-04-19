const router = require('express').Router();
const Product = require('../db/Product')

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Products.findAll();
    res.send(allProducts);
  } catch(err) {
    res.sendStatus(404)
  }
})

module.exports = router
