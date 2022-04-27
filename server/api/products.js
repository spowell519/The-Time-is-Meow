const router = require('express').Router();
const { Op } = require('sequelize');

const { Product, User } = require('../db/');

const isAdmin = async (req, res, next) => {
  const user = await User.byToken(req.headers.authorization);
  if (!user.isAdmin) {
    const err = new Error();
    err.message = 'You shall not pass!'
    err.status = 401
    return next(err)
  } else {
    return next()
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

// add product : with gatekeeping
router.post('/', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    if (user.isAdmin) res.status(201).json(await Product.create(req.body));
  } catch (err) {
    next(err);
  }
});

// update product : with gatekeeping
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    const product = (user.isAdmin)
    ? await Product.findByPk(req.params.id)
    : null;

    (product)
    ? res.json(await product.update(req.body))
    : res.status(403).send('You shall not pass!')

  } catch (err) {
    next(err)
  }
});

module.exports = router
