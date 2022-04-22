const router = require('express').Router();
// const Product = require('../db/Product')
const { Product } = require('../db/');

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send('You shall not pass!')
  } else {
    next()
  }
}

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

// add product : gatekeep
router.post('/', isAdmin, async (req, res, next) => {
  try {
    res.status(201).json(await Product.create(req.body));
  } catch (err) {
    next(err);
  }
});

// update prodcut : gatekeep
router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(await product.update(req.body));
  } catch (err) {
    next(err)
  }
});


module.exports = router
