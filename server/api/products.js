const router = require('express').Router();
// const Product = require('../db/Product')
const { Product } = require('../db/');

// all products
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.json(allProducts);
  } catch (err) {
    next(err)
  }
})

// one product
router.get('/:id', async (req, res, next) => {
  try {
      res.json(
          await Product.findByPk(req.params.id)
      );
  } catch (err) {
      next(err)
  }
});

// add product
router.post('/', async (req, res, next) => {
  try {
    res.status(201).json(await Product.create(
      req.body,
    ));
  } catch (e) {
    next(e);
  }
});

// update prodcut
router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(await product.update(req.body));
  } catch (e) {
    next(e)
  }
});

module.exports = router
