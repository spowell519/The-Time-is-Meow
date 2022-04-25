const router = require('express').Router();
const { Op } = require('sequelize');

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

// all category tags in use
router.get('/categories', async (req, res, next) => {
  try {
    console.log('/categories')
    const allCategories = await Product.getCategories();
    res.json(allCategories);
  } catch (err) {
    next(err)
  }
})

// one category
router.get('/category/:cat', async (req, res, next) => {
  try {
    res.json(
      await Product.findAll({
        where: {
          category: {
            [Op.contains]: [req.params.cat]
          }
        }
      })
      );
    } catch (err) {
      next(err)
    }
  });

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

// update product : gatekeep
router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(await product.update(req.body));
  } catch (err) {
    next(err)
  }
});

// add product to cart

module.exports = router
